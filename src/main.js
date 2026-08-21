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

const wagmiAdapter = new WagmiAdapter({ projectId, networks })

const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  allWallets: 'SHOW',
  enableWallets: true,
  enableNetworkSwitch: true,
  enableReconnect: true,
  features: { analytics: false },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#2a2bff',
    '--w3m-border-radius-master': '12px'
  }
})

window.cardtwAppKit = appKit

function showDiagnostic(message) {
  const el = document.getElementById('cardtwWalletDiagnostic')
  if (el) {
    el.style.display = 'block'
    el.textContent = message
  }
}

function short(address) {
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : ''
}

function renderWallet() {
  const status = document.getElementById('cardtwWalletStatus')
  const addressEl = document.getElementById('cardtwWalletAddress')
  if (!status || !addressEl) return

  const connected = appKit.getIsConnected()
  const address = appKit.getAddress()
  const chainId = appKit.getChainId()

  if (connected && address) {
    status.textContent = `Wallet connecté · ${short(address)}`
    addressEl.textContent = `Adresse : ${address}${chainId ? ` · Chain ID ${chainId}` : ''}`
  } else {
    status.textContent = 'Wallet non connecté'
    addressEl.textContent = 'Connectez votre wallet pour continuer.'
  }
}

function openConnect() {
  appKit.open({ view: 'Connect', namespace: 'eip155' })
}

// Custom card CTAs use the same AppKit instance.
document.querySelectorAll('[data-wallet-connect]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    openConnect()
  })
})

appKit.subscribeState(() => renderWallet())
appKit.subscribeProvider(() => renderWallet())

renderWallet()

// Confirm the official web component exists after initialization.
setTimeout(() => {
  if (!customElements.get('appkit-button')) {
    showDiagnostic('Reown AppKit ne s’est pas chargé. Vérifiez le build GitHub Pages et la console du navigateur.')
  }
}, 2500)
