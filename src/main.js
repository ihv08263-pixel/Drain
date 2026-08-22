import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, base, polygon, optimism, bsc, avalanche, linea, zkSync } from '@reown/appkit/networks'

const projectId = '17c85e8f03aeb086abdd0f20c6070032'
const networks = [mainnet, arbitrum, base, polygon, optimism, bsc, avalanche, linea, zkSync]

const metadata = {
  name: 'CardTW',
  description: 'CardTW — premium crypto cards',
  url: 'https://ihv08263-pixel.github.io',
  icons: ['https://ihv08263-pixel.github.io/cardtw/assets/cardtw-logo.svg']
}

const wagmiAdapter = new WagmiAdapter({ projectId, networks })
const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: { analytics: false },
  enableReconnect: true,
  enableNetworkSwitch: true,
  allWallets: 'SHOW',
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#3157ff',
    '--w3m-border-radius-master': '12px'
  }
})

const i18n = {
  fr:{home:'Accueil',cards:'Cartes',how:'Fonctionnement',wallet:'Wallet',connect:'Connecter le wallet',eyebrow:'CARTE CRYPTO · CARDTW',
    heroTitle:'Une carte premium.<br><span>Un wallet connecté.</span>',heroSub:'Une expérience CardTW pensée comme une vraie fintech : cartes premium, connexion wallet fluide et espace personnel accessible après connexion.',discover:'Découvrir les cartes',
    statCards:'modèles premium',statNetworks:'réseaux EVM',statAccess:'espace personnel',f1t:'Connexion wallet fluide',f1p:'Un seul parcours Reown pour connecter un wallet compatible sur PC ou mobile.',
    f2t:'Cartes premium',f2p:'Une collection claire avec quatre univers visuels et une présentation plus haut de gamme.',f3t:'Espace personnel',f3p:'Le dashboard utilisateur apparaît uniquement après la connexion du wallet.',
    f4t:'Architecture évolutive',f4p:'Le frontend est prêt à être branché ensuite à ton API et à ta base PostgreSQL sur le VPS.',collectionEyebrow:'CARD COLLECTION',
    collectionTitle:'Des cartes qui font vraiment premium.',collectionSub:'Obsidian Black, Arctic Silver, Royal Blue et 24K Gold : quatre identités visuelles prêtes à intégrer au parcours utilisateur.',
    blackDesc:'Ultimate',silverDesc:'Timeless',royalDesc:'Signature',goldDesc:'Exclusive',walletEyebrow:'WALLET',walletTitle:'Connecte ton wallet, puis retrouve ton espace.',walletSub:"Le sélecteur Reown s'occupe de la connexion. Une fois le wallet connecté, ton dashboard personnel est déverrouillé.",
    lockedTitle:'Ton dashboard est verrouillé.',lockedSub:'Connecte un wallet pour accéder à ton espace personnel, tes cartes et ton activité.',disconnect:'Déconnecter',dashTitle:'Bonjour 👋',dashSub:'Ton espace personnel CardTW.',
    connectedWallet:'Wallet connecté',networkLabel:'Réseau',overview:"Vue d'ensemble",access:'Accès',myCards:'Mes cartes',quickActions:'Actions rapides',recent:'Activité récente',
    cardDashboardDesc:'Carte principale de démonstration. Les paramètres réels pourront ensuite être branchés au backend.',logout:'Déconnexion',footer:'Interface premium de démonstration.'},
  en:{home:'Home',cards:'Cards',how:'How it works',wallet:'Wallet',connect:'Connect wallet',eyebrow:'CRYPTO CARD · CARDTW',
    heroTitle:'A premium card.<br><span>A connected wallet.</span>',heroSub:'A fintech-style CardTW experience with premium cards, smooth wallet connection and a personal space unlocked after connection.',discover:'Explore cards',
    statCards:'premium models',statNetworks:'EVM networks',statAccess:'personal space',f1t:'Smooth wallet connection',f1p:'One Reown flow for compatible wallets on desktop or mobile.',
    f2t:'Premium cards',f2p:'A clean collection with four distinct visual identities.',f3t:'Personal space',f3p:'The user dashboard appears only after a wallet is connected.',
    f4t:'Scalable architecture',f4p:'The frontend is ready to connect to your API and PostgreSQL later on the VPS.',collectionEyebrow:'CARD COLLECTION',
    collectionTitle:'Cards designed to feel premium.',collectionSub:'Obsidian Black, Arctic Silver, Royal Blue and 24K Gold — four identities ready for the user journey.',
    blackDesc:'Ultimate',silverDesc:'Timeless',royalDesc:'Signature',goldDesc:'Exclusive',walletEyebrow:'WALLET',walletTitle:'Connect your wallet, then enter your space.',walletSub:'Reown handles the connection. Once connected, your personal dashboard unlocks.',
    lockedTitle:'Your dashboard is locked.',lockedSub:'Connect a wallet to access your personal space, cards and activity.',disconnect:'Disconnect',dashTitle:'Welcome back 👋',dashSub:'Your personal CardTW space.',
    connectedWallet:'Connected wallet',networkLabel:'Network',overview:'Overview',access:'Access',myCards:'My cards',quickActions:'Quick actions',recent:'Recent activity',
    cardDashboardDesc:'Demo primary card. Real parameters can later be connected to the backend.',logout:'Log out',footer:'Premium demo interface.'},
  es:{home:'Inicio',cards:'Tarjetas',how:'Cómo funciona',wallet:'Wallet',connect:'Conectar wallet',eyebrow:'TARJETA CRYPTO · CARDTW',
    heroTitle:'Una tarjeta premium.<br><span>Una wallet conectada.</span>',heroSub:'Una experiencia CardTW de estilo fintech con tarjetas premium, conexión fluida y espacio personal tras conectar la wallet.',discover:'Ver tarjetas',
    statCards:'modelos premium',statNetworks:'redes EVM',statAccess:'espacio personal',f1t:'Conexión fluida',f1p:'Un solo flujo Reown para wallets compatibles en PC o móvil.',
    f2t:'Tarjetas premium',f2p:'Una colección limpia con cuatro identidades visuales.',f3t:'Espacio personal',f3p:'El dashboard aparece solo después de conectar la wallet.',
    f4t:'Arquitectura escalable',f4p:'El frontend está listo para conectarse a tu API y PostgreSQL en el VPS.',collectionEyebrow:'COLECCIÓN',
    collectionTitle:'Tarjetas con aspecto realmente premium.',collectionSub:'Obsidian Black, Arctic Silver, Royal Blue y 24K Gold.',
    blackDesc:'Ultimate',silverDesc:'Timeless',royalDesc:'Signature',goldDesc:'Exclusive',walletEyebrow:'WALLET',walletTitle:'Conecta tu wallet y entra en tu espacio.',walletSub:'Reown gestiona la conexión. Una vez conectada, se desbloquea tu dashboard personal.',
    lockedTitle:'Tu dashboard está bloqueado.',lockedSub:'Conecta una wallet para acceder a tu espacio, tarjetas y actividad.',disconnect:'Desconectar',dashTitle:'Hola 👋',dashSub:'Tu espacio personal CardTW.',
    connectedWallet:'Wallet conectada',networkLabel:'Red',overview:'Resumen',access:'Acceso',myCards:'Mis tarjetas',quickActions:'Acciones rápidas',recent:'Actividad reciente',
    cardDashboardDesc:'Tarjeta principal de demostración. Los parámetros reales se conectarán después al backend.',logout:'Salir',footer:'Interfaz premium de demostración.'},
  de:{home:'Start',cards:'Karten',how:'So funktioniert es',wallet:'Wallet',connect:'Wallet verbinden',eyebrow:'KRYPTO-KARTE · CARDTW',
    heroTitle:'Eine Premium-Karte.<br><span>Eine verbundene Wallet.</span>',heroSub:'CardTW verbindet Premium-Karten, Wallet-Verbindung und einen persönlichen Bereich in einem Fintech-inspirierten Erlebnis.',discover:'Karten ansehen',
    statCards:'Premium-Modelle',statNetworks:'EVM-Netzwerke',statAccess:'persönlicher Bereich',f1t:'Schnelle Verbindung',f1p:'Ein Reown-Flow für kompatible Wallets auf PC und Mobilgerät.',
    f2t:'Premium-Karten',f2p:'Eine klare Sammlung mit vier visuellen Identitäten.',f3t:'Persönlicher Bereich',f3p:'Das Dashboard wird erst nach der Wallet-Verbindung freigeschaltet.',
    f4t:'Skalierbare Architektur',f4p:'Bereit für API und PostgreSQL auf dem VPS.',collectionEyebrow:'KARTENSAMMLUNG',
    collectionTitle:'Karten mit echtem Premium-Look.',collectionSub:'Obsidian Black, Arctic Silver, Royal Blue und 24K Gold.',
    blackDesc:'Ultimate',silverDesc:'Timeless',royalDesc:'Signature',goldDesc:'Exclusive',walletEyebrow:'WALLET',walletTitle:'Wallet verbinden und den persönlichen Bereich öffnen.',walletSub:'Reown übernimmt die Verbindung. Danach wird das persönliche Dashboard freigeschaltet.',
    lockedTitle:'Dashboard gesperrt.',lockedSub:'Verbinde eine Wallet, um deinen Bereich, Karten und Aktivitäten zu sehen.',disconnect:'Trennen',dashTitle:'Willkommen zurück 👋',dashSub:'Dein persönlicher CardTW-Bereich.',
    connectedWallet:'Verbundene Wallet',networkLabel:'Netzwerk',overview:'Überblick',access:'Zugriff',myCards:'Meine Karten',quickActions:'Schnellaktionen',recent:'Aktuelle Aktivität',
    cardDashboardDesc:'Demo-Karte. Echte Parameter können später mit dem Backend verbunden werden.',logout:'Abmelden',footer:'Premium-Demo-Oberfläche.'}
}
const t = (key) => (i18n[document.getElementById('language')?.value || 'fr'] || i18n.fr)[key] || key

function applyLanguage(){
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n))
  document.querySelectorAll('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.dataset.i18nHtml))
  document.documentElement.lang=document.getElementById('language')?.value || 'fr'
}
const saved=localStorage.getItem('cardtw_lang')||'fr'
document.getElementById('language').value=saved
document.getElementById('language').addEventListener('change',e=>{localStorage.setItem('cardtw_lang',e.target.value);applyLanguage()})
applyLanguage()

const walletStatus=document.getElementById('walletStatus')
const walletAddress=document.getElementById('walletAddress')
const dashAddress=document.getElementById('dashAddress')
const dashNetwork=document.getElementById('dashNetwork')
const statusDot=document.getElementById('statusDot')
const dashboard=document.getElementById('dashboard')
const locked=document.getElementById('lockedDash')

function short(a){return a?`${a.slice(0,6)}…${a.slice(-4)}`:''}
function networkName(chainId){
  const map={'0x1':'Ethereum','0x38':'BNB Chain','0x89':'Polygon','0xa4b1':'Arbitrum','0xa':'Optimism','0x2105':'Base','0xa86a':'Avalanche','0xe708':'Linea','0x144':'zkSync Era'}
  return map[chainId] || `Chain ${chainId || '—'}`
}
function render(){
  const connected=modal.getIsConnected()
  const address=modal.getAddress()
  const chainId=modal.getChainId()
  if(connected && address){
    walletStatus.textContent=`Wallet connecté · ${short(address)}`
    walletAddress.textContent=address
    dashAddress.textContent=address
    dashNetwork.textContent=networkName(chainId)
    statusDot.classList.add('connected')
    dashboard.style.display='block'
    locked.style.display='none'
    localStorage.setItem('cardtw_connected','1')
  } else {
    walletStatus.textContent='Wallet non connecté'
    walletAddress.textContent='Connecte ton wallet pour commencer.'
    statusDot.classList.remove('connected')
    dashboard.style.display='none'
    locked.style.display='block'
    localStorage.removeItem('cardtw_connected')
  }
}
function openWallet(){ modal.open({view:'Connect',namespace:'eip155'}) }
document.querySelectorAll('[data-wallet-connect]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();openWallet()}))
document.getElementById('disconnectBtn').addEventListener('click',()=>modal.disconnect())
modal.subscribeState(()=>{render()})
modal.subscribeProvider(()=>{render()})
render()
