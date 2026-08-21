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
