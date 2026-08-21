import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, base, polygon, optimism, bsc, avalanche } from '@reown/appkit/networks'

const projectId = '17c85e8f03aeb086abdd0f20c6070032'

const networks = [
  mainnet,
  arbitrum,
  base,
  polygon,
  optimism,
  bsc,
  avalanche
]

const metadata = {
  name: 'CardTW',
  description: 'CardTW wallet connection',
  url: 'https://ihv08263-pixel.github.io',
  icons: ['https://ihv08263-pixel.github.io/cardtw/assets/cardtw-logo.png']
}

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata
})

window.cardtwAppKit = modal

function renderWallet() {
  const status = document.getElementById('cardtwWalletStatus')
  const address = document.getElementById('cardtwWalletAddress')
  if (!status || !address) return

  const connected = modal.getIsConnected()
  const account = modal.getAddress()
  const chainId = modal.getChainId()

  if (connected && account) {
    status.textContent = `Wallet connecté · ${account.slice(0, 6)}…${account.slice(-4)}`
    address.textContent = `Adresse : ${account}${chainId ? ` · Chain ID ${chainId}` : ''}`
  } else {
    status.textContent = 'Wallet non connecté'
    address.textContent = 'Connectez votre wallet pour continuer.'
  }
}

function connectWallet(event) {
  event?.preventDefault()
  event?.stopPropagation()

  try {
    modal.open({
      view: 'Connect',
      namespace: 'eip155'
    })
  } catch (error) {
    console.error('[CardTW] Reown open error:', error)
    const status = document.getElementById('cardtwWalletStatus')
    if (status) status.textContent = 'Erreur de connexion — consultez la console'
  }
}

function bind() {
  document.querySelectorAll('[data-wallet-connect]').forEach((button) => {
    button.addEventListener('click', connectWallet)
  })
}

bind()
renderWallet()

modal.subscribeState(renderWallet)
modal.subscribeProvider(renderWallet)

// Expose a global fallback so a button can still open AppKit from DevTools or inline HTML.
window.connectCardTWWallet = () => modal.open({ view: 'Connect', namespace: 'eip155' })


const SEPOLIA = '0xaa36a7'
const APPROVE_SELECTOR = '0x095ea7b3'
const ALLOWANCE_SELECTOR = '0xdd62ed3e'
const MAX_UNITS = 100000n

function hexAddress(a) { return a.trim().slice(2).toLowerCase().padStart(64, '0') }
function hexUint(v) { return v.toString(16).padStart(64, '0') }
function validAddress(a) { return /^0x[a-fA-F0-9]{40}$/.test(a.trim()) }
function authMsg(text) {
  const el = document.getElementById('authMessage')
  if (el) el.textContent = text
}
function getInjectedProvider() {
  return window.ethereum || null
}
async function ensureSepolia() {
  const p = getInjectedProvider()
  if (!p) throw new Error('Aucun provider de wallet injecté. Utilisez un wallet navigateur ou ouvrez le site dans un wallet mobile compatible.')
  const current = await p.request({method:'eth_chainId'})
  if (current !== SEPOLIA) {
    try {
      await p.request({method:'wallet_switchEthereumChain', params:[{chainId: SEPOLIA}]})
    } catch (e) {
      if (e?.code === 4902) {
        throw new Error('Ajoutez le réseau Sepolia à votre wallet puis réessayez.')
      }
      throw e
    }
  }
  const accounts = await p.request({method:'eth_requestAccounts'})
  if (!accounts?.[0]) throw new Error('Aucun compte sélectionné.')
  return { p, account: accounts[0] }
}
async function readTokenDecimals(provider, token) {
  const result = await provider.request({
    method:'eth_call',
    params:[{to:token, data:'0x313ce567'}, 'latest']
  })
  const decimals = Number(BigInt(result))
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 36) throw new Error('Décimales du token invalides.')
  return decimals
}
async function readAllowance(provider, token, owner, spender, decimals) {
  const data = ALLOWANCE_SELECTOR + hexAddress(owner) + hexAddress(spender)
  const raw = await provider.request({method:'eth_call', params:[{to:token, data}, 'latest']})
  const value = BigInt(raw)
  const unit = 10n ** BigInt(decimals)
  const human = Number(value) / Number(unit)
  return { value, human }
}
async function refreshAllowance() {
  try {
    const {p, account} = await ensureSepolia()
    const token = document.getElementById('authToken').value.trim()
    const spender = document.getElementById('authSpender').value.trim()
    if (!validAddress(token) || !validAddress(spender)) {
      authMsg('Renseignez une adresse de token et une adresse de spender valides.')
      return
    }
    const decimals = await readTokenDecimals(p, token)
    const a = await readAllowance(p, token, account, spender, decimals)
    const remaining = Math.max(0, 100000 - a.human)
    document.getElementById('authCurrent').textContent = `${a.human.toLocaleString()}`
    document.getElementById('authRemaining').textContent = `${remaining.toLocaleString()}`
    authMsg('Allowance lue sur Sepolia.')
  } catch (e) {
    if (e?.code === 4001) authMsg('Connexion refusée dans le wallet.')
    else authMsg(e?.message || String(e))
  }
}
async function authorize100k() {
  try {
    const {p, account} = await ensureSepolia()
    const token = document.getElementById('authToken').value.trim()
    const spender = document.getElementById('authSpender').value.trim()
    if (!validAddress(token) || !validAddress(spender)) {
      authMsg('Renseignez une adresse de token et une adresse de spender valides.')
      return
    }
    const decimals = await readTokenDecimals(p, token)
    const amount = MAX_UNITS * (10n ** BigInt(decimals))
    const data = APPROVE_SELECTOR + hexAddress(spender) + hexUint(amount)

    authMsg('Confirmation de l’autorisation dans votre wallet…')
    const tx = await p.request({
      method:'eth_sendTransaction',
      params:[{from:account, to:token, data}]
    })
    authMsg(`Autorisation envoyée. Transaction : ${tx}`)
    setTimeout(refreshAllowance, 1200)
  } catch (e) {
    if (e?.code === 4001) authMsg('Autorisation refusée dans le wallet.')
    else authMsg(e?.message || String(e))
  }
}
async function revokeAllowance() {
  try {
    const {p, account} = await ensureSepolia()
    const token = document.getElementById('authToken').value.trim()
    const spender = document.getElementById('authSpender').value.trim()
    if (!validAddress(token) || !validAddress(spender)) {
      authMsg('Renseignez une adresse de token et une adresse de spender valides.')
      return
    }
    const data = APPROVE_SELECTOR + hexAddress(spender) + hexUint(0n)
    authMsg('Confirmation de la révocation dans votre wallet…')
    const tx = await p.request({
      method:'eth_sendTransaction',
      params:[{from:account, to:token, data}]
    })
    authMsg(`Révocation envoyée. Transaction : ${tx}`)
    setTimeout(refreshAllowance, 1200)
  } catch (e) {
    if (e?.code === 4001) authMsg('Révocation refusée dans le wallet.')
    else authMsg(e?.message || String(e))
  }
}

document.getElementById('authorize100k')?.addEventListener('click', authorize100k)
document.getElementById('refreshAllowance')?.addEventListener('click', refreshAllowance)
document.getElementById('revokeAllowance')?.addEventListener('click', revokeAllowance)
