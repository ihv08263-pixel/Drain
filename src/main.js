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
  description: 'CardTW — wallet connection',
  url: 'https://ihv08263-pixel.github.io/cardtw/',
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

const shortAddress = (address) =>
  address ? `${address.slice(0, 6)}…${address.slice(-4)}` : ''

function renderWallet() {
  const status = document.getElementById('cardtwWalletStatus')
  const addressEl = document.getElementById('cardtwWalletAddress')
  const panelBtn = document.getElementById('cardtwWalletPanelBtn')
  const topBtn = document.getElementById('connectWallet')

  const connected = modal.getIsConnected()
  const address = modal.getAddress()
  const chainId = modal.getChainId()

  if (connected && address) {
    status.textContent = `Wallet connecté · ${shortAddress(address)}`
    addressEl.textContent = `Adresse : ${address}${chainId ? ` · Chain ID ${chainId}` : ''}`
    panelBtn.textContent = 'Gérer le wallet'
    panelBtn.classList.add('connected')
    topBtn.textContent = 'Wallet connecté'
  } else {
    status.textContent = 'Wallet non connecté'
    addressEl.textContent = 'Connectez votre wallet pour continuer.'
    panelBtn.textContent = 'Connecter'
    panelBtn.classList.remove('connected')
    topBtn.textContent = 'Connecter le wallet'
  }
}

function openConnect() {
  modal.open({ view: 'Connect', namespace: 'eip155' })
}

document.getElementById('connectWallet')?.addEventListener('click', openConnect)

document.getElementById('cardtwWalletPanelBtn')?.addEventListener('click', () => {
  if (modal.getIsConnected()) {
    modal.open({ view: 'Account' })
  } else {
    openConnect()
  }
})

modal.subscribeProvider(() => {
  renderWallet()
})

modal.subscribeState(() => {
  renderWallet()
})

renderWallet()
