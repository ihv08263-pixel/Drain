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
  features: { analytics: false },
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
  const buttons = document.querySelectorAll('[data-wallet-connect]')

  if (!status || !addressEl) return

  const connected = modal.getIsConnected()
  const address = modal.getAddress()
  const chainId = modal.getChainId()

  if (connected && address) {
    status.textContent = `Wallet connecté · ${shortAddress(address)}`
    addressEl.textContent = `Adresse : ${address}${chainId ? ` · Chain ID ${chainId}` : ''}`

    buttons.forEach((button) => {
      button.textContent =
        button.dataset.walletRole === 'primary'
          ? 'Wallet connecté'
          : button.textContent.includes('émettre') || button.textContent.includes('précommander')
            ? button.textContent
            : 'Gérer le wallet'
    })
  } else {
    status.textContent = 'Wallet non connecté'
    addressEl.textContent = 'Connectez votre wallet pour continuer.'

    buttons.forEach((button) => {
      const role = button.dataset.walletRole
      if (role === 'primary') {
        button.textContent = 'Connecter le wallet'
      } else if (button.dataset.walletAction === 'card') {
        button.textContent = button.dataset.originalLabel || 'Connecter pour continuer'
      }
    })
  }
}

function openConnect() {
  modal.open({ view: 'Connect', namespace: 'eip155' })
}

document.querySelectorAll('[data-wallet-connect]').forEach((button) => {
  button.addEventListener('click', () => {
    if (modal.getIsConnected()) {
      modal.open({ view: 'Account' })
    } else {
      openConnect()
    }
  })
})

modal.subscribeProvider(() => {
  renderWallet()
})

modal.subscribeState(() => {
  renderWallet()
})

renderWallet()
