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
  url: 'https://ihv08263-pixel.github.io/cardtw/',
  icons: ['https://ihv08263-pixel.github.io/cardtw/assets/cardtw-logo.png']
}

const wagmiAdapter = new WagmiAdapter({ projectId, networks })

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

  if (!status || !addressEl) return

  const connected = modal.getIsConnected()
  const address = modal.getAddress()
  const chainId = modal.getChainId()

  if (connected && address) {
    status.textContent = `Wallet connecté · ${shortAddress(address)}`
    addressEl.textContent = `Adresse : ${address}${chainId ? ` · Chain ID ${chainId}` : ''}`
  } else {
    status.textContent = 'Wallet non connecté'
    addressEl.textContent = 'Connectez votre wallet pour continuer.'
  }
}

function openConnect() {
  modal.open({ view: 'Connect', namespace: 'eip155' })
}

function openAccount() {
  modal.open({ view: 'Account' })
}

// Every wallet-related button uses the same handler.
document.querySelectorAll('[data-wallet-connect]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    if (modal.getIsConnected()) {
      openAccount()
    } else {
      openConnect()
    }
  })
})

modal.subscribeProvider(() => renderWallet())
modal.subscribeState(() => renderWallet())

renderWallet()
