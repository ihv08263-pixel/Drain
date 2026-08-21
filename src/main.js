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
