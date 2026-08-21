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
  // Reown requires the URL origin to match the app domain.
  url: 'https://ihv08263-pixel.github.io',
  icons: ['https://ihv08263-pixel.github.io/cardtw/assets/cardtw-logo.png']
}

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  allWallets: 'SHOW',
  enableWallets: true,
  enableNetworkSwitch: true,
  enableReconnect: true,
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

const short = (address) =>
  address ? `${address.slice(0, 6)}…${address.slice(-4)}` : ''

function renderWallet() {
  const status = document.getElementById('cardtwWalletStatus')
  const addressEl = document.getElementById('cardtwWalletAddress')
  const connected = appKit.getIsConnected()
  const address = appKit.getAddress()
  const chainId = appKit.getChainId()

  if (!status || !addressEl) return

  if (connected && address) {
    status.textContent = `Wallet connecté · ${short(address)}`
    addressEl.textContent = `Adresse : ${address}${chainId ? ` · Chain ID ${chainId}` : ''}`
  } else {
    status.textContent = 'Wallet non connecté'
    addressEl.textContent = 'Connectez votre wallet pour continuer.'
  }
}

function openWallet() {
  if (appKit.getIsConnected()) {
    appKit.open({ view: 'Account' })
  } else {
    appKit.open({ view: 'Connect', namespace: 'eip155' })
  }
}

function bindWalletButtons() {
  document.querySelectorAll('[data-wallet-connect]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      openWallet()
    })
  })

  // Official AppKit component as a reliable fallback if a custom trigger ever fails.
  const fallback = document.querySelector('#appkitFallbackButton')
  if (fallback) fallback.addEventListener('click', openWallet)
}

appKit.subscribeProvider(() => renderWallet())
appKit.subscribeState(() => renderWallet())

bindWalletButtons()
renderWallet()
