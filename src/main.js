import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, polygon, arbitrum, optimism, base, bsc, avalanche } from '@reown/appkit/networks'

const projectId = '17c85e8f03aeb086abdd0f20c6070032'
const networks = [mainnet, polygon, arbitrum, optimism, base, bsc, avalanche]

const metadata = {
  name: 'CardTW',
  description: 'CardTW premium crypto cards',
  url: window.location.origin,
  icons: [`${window.location.origin}/cardtw/assets/cardtw-logo.svg`]
}

const wagmiAdapter = new WagmiAdapter({ projectId, networks })

let modal
let initError = null
try {
  modal = createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    defaultNetwork: mainnet,
    metadata,
    features: {
      analytics: false,
      email: false,
      socials: false
    },
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#3157ff',
      '--w3m-border-radius-master': '12px',
      '--w3m-z-index': '1000'
    }
  })
  window.cardtwAppKit = modal
} catch (err) {
  initError = err
  console.error('[CardTW] AppKit initialization failed', err)
}

const translations = {
  fr:{home:'Accueil',cards:'Cartes',how:'Fonctionnement',wallet:'Wallet',connect:'Connecter le wallet',eyebrow:'CARTE CRYPTO · CARDTW',
    heroTitle:'Une carte premium.<br><span>Un wallet connecté.</span>',heroSub:'Une expérience CardTW pensée comme une vraie fintech : cartes premium, connexion wallet fluide et espace personnel accessible après connexion.',discover:'Découvrir les cartes',
    statCards:'modèles premium',statNetworks:'réseaux EVM',statAccess:'espace personnel',f1t:'Connexion wallet fluide',f1p:'Un seul parcours Reown pour connecter un wallet compatible sur PC ou mobile.',f2t:'Cartes premium',f2p:'Une collection claire avec trois niveaux de finition.',f3t:'Espace personnel',f3p:'Le dashboard utilisateur apparaît uniquement après la connexion du wallet.',f4t:'Architecture évolutive',f4p:'Le frontend est prêt à être branché ensuite à ton API et à ta base PostgreSQL sur le VPS.',
    collectionEyebrow:'CARD COLLECTION',collectionTitle:'Des cartes qui font vraiment premium.',collectionSub:'Royal Blue, Obsidian Black et 24K Gold : trois niveaux de finition, chacun avec une identité visuelle forte.',royalCardDesc:'Simple, premium et accessible.',obsidianCardDesc:'Obsidienne noire, finition signature.',goldCardDesc:'Finition or, style ultra premium.',
    walletEyebrow:'WALLET',walletTitle:'Connecte ton wallet, puis retrouve ton espace.',walletSub:"Le sélecteur Reown s'occupe de la connexion. Une fois le wallet connecté, ton dashboard personnel est déverrouillé.",lockedTitle:'Ton dashboard est verrouillé.',lockedSub:'Connecte un wallet pour accéder à ton espace personnel, tes cartes et ton activité.',disconnect:'Déconnecter',dashTitle:'Bonjour 👋',dashSub:'Ton espace personnel CardTW.',connectedWallet:'Wallet connecté',networkLabel:'Réseau',overview:"Vue d'ensemble",access:'Accès',myCards:'Mes cartes',quickActions:'Actions rapides',recent:'Activité récente',cardDashboardDesc:'Carte principale de démonstration.',logout:'Déconnexion',footer:'Interface premium de démonstration.'},
  en:{home:'Home',cards:'Cards',how:'How it works',wallet:'Wallet',connect:'Connect wallet',eyebrow:'CRYPTO CARD · CARDTW',
    heroTitle:'A premium card.<br><span>A connected wallet.</span>',heroSub:'A fintech-style CardTW experience with premium cards, smooth wallet connection and a personal space unlocked after connection.',discover:'Explore cards',
    statCards:'premium models',statNetworks:'EVM networks',statAccess:'personal space',f1t:'Smooth wallet connection',f1p:'One Reown flow for compatible wallets on desktop or mobile.',f2t:'Premium cards',f2p:'A clean collection with three finish levels.',f3t:'Personal space',f3p:'The user dashboard appears only after a wallet is connected.',f4t:'Scalable architecture',f4p:'The frontend is ready for your API and PostgreSQL on the VPS.',
    collectionEyebrow:'CARD COLLECTION',collectionTitle:'Cards designed to feel premium.',collectionSub:'Royal Blue, Obsidian Black and 24K Gold — three distinct finish levels.',royalCardDesc:'Simple, premium and accessible.',obsidianCardDesc:'Black obsidian signature finish.',goldCardDesc:'Ultra-premium gold finish.',
    walletEyebrow:'WALLET',walletTitle:'Connect your wallet, then enter your space.',walletSub:'Reown handles the connection. Once connected, your personal dashboard unlocks.',lockedTitle:'Your dashboard is locked.',lockedSub:'Connect a wallet to access your personal space, cards and activity.',disconnect:'Disconnect',dashTitle:'Welcome back 👋',dashSub:'Your personal CardTW space.',connectedWallet:'Connected wallet',networkLabel:'Network',overview:'Overview',access:'Access',myCards:'My cards',quickActions:'Quick actions',recent:'Recent activity',cardDashboardDesc:'Demo primary card.',logout:'Log out',footer:'Premium demo interface.'},
  es:{home:'Inicio',cards:'Tarjetas',how:'Cómo funciona',wallet:'Wallet',connect:'Conectar wallet',eyebrow:'TARJETA CRYPTO · CARDTW',heroTitle:'Una tarjeta premium.<br><span>Una wallet conectada.</span>',heroSub:'Experiencia CardTW de estilo fintech con tarjetas premium y espacio personal tras conectar.',discover:'Ver tarjetas',
    statCards:'modelos premium',statNetworks:'redes EVM',statAccess:'espacio personal',f1t:'Conexión fluida',f1p:'Un solo flujo Reown.',f2t:'Tarjetas premium',f2p:'Tres niveles de acabado.',f3t:'Espacio personal',f3p:'Dashboard tras conectar.',f4t:'Arquitectura escalable',f4p:'Lista para API y PostgreSQL.',
    collectionEyebrow:'COLECCIÓN',collectionTitle:'Tarjetas con aspecto premium.',collectionSub:'Royal Blue, Obsidian Black y 24K Gold.',royalCardDesc:'Simple y premium.',obsidianCardDesc:'Acabado de obsidiana negra.',goldCardDesc:'Acabado dorado ultra premium.',
    walletEyebrow:'WALLET',walletTitle:'Conecta tu wallet y entra en tu espacio.',walletSub:'Reown gestiona la conexión.',lockedTitle:'Dashboard bloqueado.',lockedSub:'Conecta una wallet para acceder.',disconnect:'Desconectar',dashTitle:'Hola 👋',dashSub:'Tu espacio CardTW.',connectedWallet:'Wallet conectada',networkLabel:'Red',overview:'Resumen',access:'Acceso',myCards:'Mis tarjetas',quickActions:'Acciones rápidas',recent:'Actividad reciente',cardDashboardDesc:'Tarjeta de demostración.',logout:'Salir',footer:'Interfaz premium.'},
  de:{home:'Start',cards:'Karten',how:'So funktioniert es',wallet:'Wallet',connect:'Wallet verbinden',eyebrow:'KRYPTO-KARTE · CARDTW',heroTitle:'Eine Premium-Karte.<br><span>Eine verbundene Wallet.</span>',heroSub:'Fintech-inspiriertes CardTW-Erlebnis mit Premium-Karten.',discover:'Karten ansehen',
    statCards:'Premium-Modelle',statNetworks:'EVM-Netzwerke',statAccess:'persönlicher Bereich',f1t:'Schnelle Verbindung',f1p:'Ein Reown-Flow.',f2t:'Premium-Karten',f2p:'Drei Finish-Level.',f3t:'Persönlicher Bereich',f3p:'Dashboard nach Verbindung.',f4t:'Skalierbare Architektur',f4p:'Bereit für API und PostgreSQL.',
    collectionEyebrow:'KARTENSAMMLUNG',collectionTitle:'Karten mit echtem Premium-Look.',collectionSub:'Royal Blue, Obsidian Black und 24K Gold.',royalCardDesc:'Einfach und hochwertig.',obsidianCardDesc:'Schwarze Obsidian-Oberfläche.',goldCardDesc:'Ultra-Premium-Goldfinish.',
    walletEyebrow:'WALLET',walletTitle:'Wallet verbinden und den Bereich öffnen.',walletSub:'Reown übernimmt die Verbindung.',lockedTitle:'Dashboard gesperrt.',lockedSub:'Verbinde eine Wallet.',disconnect:'Trennen',dashTitle:'Willkommen zurück 👋',dashSub:'Dein CardTW-Bereich.',connectedWallet:'Verbundene Wallet',networkLabel:'Netzwerk',overview:'Überblick',access:'Zugriff',myCards:'Meine Karten',quickActions:'Schnellaktionen',recent:'Aktuelle Aktivität',cardDashboardDesc:'Demo-Karte.',logout:'Abmelden',footer:'Premium-Demo.'},
  pt:{home:'Início',cards:'Cartões',how:'Como funciona',wallet:'Wallet',connect:'Conectar wallet',eyebrow:'CARTÃO CRYPTO · CARDTW',heroTitle:'Um cartão premium.<br><span>Uma wallet conectada.</span>',heroSub:'Experiência fintech CardTW com cartões premium e área pessoal.',discover:'Ver cartões',statCards:'modelos premium',statNetworks:'redes EVM',statAccess:'área pessoal',
    f1t:'Conexão simples',f1p:'Um fluxo Reown.',f2t:'Cartões premium',f2p:'Três níveis.',f3t:'Área pessoal',f3p:'Dashboard após conexão.',f4t:'Arquitetura escalável',f4p:'Pronta para API e PostgreSQL.',collectionEyebrow:'COLEÇÃO',collectionTitle:'Cartões premium.',collectionSub:'Royal Blue, Obsidian Black e 24K Gold.',royalCardDesc:'Simples e premium.',obsidianCardDesc:'Acabamento em obsidiana.',goldCardDesc:'Ouro ultra premium.',walletEyebrow:'WALLET',walletTitle:'Conecte sua wallet.',walletSub:'Reown cuida da conexão.',lockedTitle:'Dashboard bloqueado.',lockedSub:'Conecte uma wallet.',disconnect:'Desconectar',dashTitle:'Olá 👋',dashSub:'Seu espaço CardTW.',connectedWallet:'Wallet conectada',networkLabel:'Rede',overview:'Visão geral',access:'Acesso',myCards:'Meus cartões',quickActions:'Ações rápidas',recent:'Atividade recente',cardDashboardDesc:'Cartão de demonstração.',logout:'Sair',footer:'Interface premium.'},
  ru:{home:'Главная',cards:'Карты',how:'Как это работает',wallet:'Кошелёк',connect:'Подключить кошелёк',eyebrow:'КРИПТО-КАРТА · CARDTW',heroTitle:'Премиальная карта.<br><span>Подключённый кошелёк.</span>',heroSub:'Fintech-интерфейс CardTW с премиальными картами.',discover:'Смотреть карты',statCards:'премиум-модели',statNetworks:'EVM-сети',statAccess:'личный кабинет',
    f1t:'Быстрое подключение',f1p:'Один поток Reown.',f2t:'Премиум-карты',f2p:'Три уровня.',f3t:'Личный кабинет',f3p:'Доступ после подключения.',f4t:'Масштабируемость',f4p:'Готово для API и PostgreSQL.',collectionEyebrow:'КОЛЛЕКЦИЯ',collectionTitle:'Карты премиум-класса.',collectionSub:'Royal Blue, Obsidian Black и 24K Gold.',royalCardDesc:'Просто и премиально.',obsidianCardDesc:'Чёрный обсидиан.',goldCardDesc:'Ультра-премиальное золото.',walletEyebrow:'КОШЕЛЁК',walletTitle:'Подключите кошелёк.',walletSub:'Reown выполняет подключение.',lockedTitle:'Доступ закрыт.',lockedSub:'Подключите кошелёк.',disconnect:'Отключить',dashTitle:'С возвращением 👋',dashSub:'Ваш CardTW.',connectedWallet:'Подключённый кошелёк',networkLabel:'Сеть',overview:'Обзор',access:'Доступ',myCards:'Мои карты',quickActions:'Быстрые действия',recent:'Недавняя активность',cardDashboardDesc:'Демо-карта.',logout:'Выйти',footer:'Премиум-интерфейс.'},
  tr:{home:'Ana sayfa',cards:'Kartlar',how:'Nasıl çalışır',wallet:'Cüzdan',connect:'Cüzdanı bağla',eyebrow:'KRİPTO KART · CARDTW',heroTitle:'Premium kart.<br><span>Bağlı cüzdan.</span>',heroSub:'Premium kartlar ve kişisel alanla fintech tarzı deneyim.',discover:'Kartları gör',statCards:'premium model',statNetworks:'EVM ağı',statAccess:'kişisel alan',
    f1t:'Kolay bağlantı',f1p:'Tek Reown akışı.',f2t:'Premium kartlar',f2p:'Üç seviye.',f3t:'Kişisel alan',f3p:'Bağlantı sonrası dashboard.',f4t:'Ölçeklenebilir',f4p:'API ve PostgreSQL hazır.',collectionEyebrow:'KART KOLEKSİYONU',collectionTitle:'Gerçek premium kartlar.',collectionSub:'Royal Blue, Obsidian Black ve 24K Gold.',royalCardDesc:'Basit ve premium.',obsidianCardDesc:'Siyah obsidyen.',goldCardDesc:'Ultra premium altın.',walletEyebrow:'CÜZDAN',walletTitle:'Cüzdanını bağla.',walletSub:'Reown bağlantıyı yönetir.',lockedTitle:'Dashboard kilitli.',lockedSub:'Cüzdan bağlayın.',disconnect:'Bağlantıyı kes',dashTitle:'Tekrar hoş geldin 👋',dashSub:'CardTW alanın.',connectedWallet:'Bağlı cüzdan',networkLabel:'Ağ',overview:'Genel bakış',access:'Erişim',myCards:'Kartlarım',quickActions:'Hızlı işlemler',recent:'Son etkinlik',cardDashboardDesc:'Demo kart.',logout:'Çıkış',footer:'Premium arayüz.'},
  zh:{home:'首页',cards:'卡片',how:'工作方式',wallet:'钱包',connect:'连接钱包',eyebrow:'加密卡 · CARDTW',heroTitle:'高级卡片。<br><span>已连接的钱包。</span>',heroSub:'高端卡片、流畅的钱包连接和个人空间。',discover:'查看卡片',statCards:'高级型号',statNetworks:'EVM 网络',statAccess:'个人空间',
    f1t:'流畅连接',f1p:'一个 Reown 流程。',f2t:'高级卡片',f2p:'三个等级。',f3t:'个人空间',f3p:'连接后解锁。',f4t:'可扩展架构',f4p:'准备连接 API 和 PostgreSQL。',collectionEyebrow:'卡片系列',collectionTitle:'真正高级的卡片。',collectionSub:'Royal Blue、Obsidian Black、24K Gold。',royalCardDesc:'简洁高级。',obsidianCardDesc:'黑曜石质感。',goldCardDesc:'超高级金色。',walletEyebrow:'钱包',walletTitle:'连接钱包。',walletSub:'Reown 负责连接。',lockedTitle:'Dashboard 已锁定。',lockedSub:'连接钱包以继续。',disconnect:'断开',dashTitle:'欢迎回来 👋',dashSub:'你的 CardTW 空间。',connectedWallet:'已连接钱包',networkLabel:'网络',overview:'概览',access:'访问',myCards:'我的卡片',quickActions:'快捷操作',recent:'最近活动',cardDashboardDesc:'演示卡片。',logout:'退出',footer:'高级演示界面。'},
  ja:{home:'ホーム',cards:'カード',how:'仕組み',wallet:'ウォレット',connect:'ウォレットを接続',eyebrow:'暗号カード · CARDTW',heroTitle:'プレミアムカード。<br><span>接続されたウォレット。</span>',heroSub:'プレミアムカードとスムーズな接続を備えたCardTW。',discover:'カードを見る',statCards:'プレミアムモデル',statNetworks:'EVMネットワーク',statAccess:'パーソナルスペース',
    f1t:'スムーズな接続',f1p:'Reownで簡単接続。',f2t:'プレミアムカード',f2p:'3つの仕上げ。',f3t:'パーソナルスペース',f3p:'接続後に解放。',f4t:'拡張可能',f4p:'APIとPostgreSQLに対応。',collectionEyebrow:'カードコレクション',collectionTitle:'本格的なプレミアムカード。',collectionSub:'Royal Blue、Obsidian Black、24K Gold。',royalCardDesc:'シンプルで上質。',obsidianCardDesc:'黒曜石仕上げ。',goldCardDesc:'超プレミアムゴールド。',walletEyebrow:'ウォレット',walletTitle:'ウォレットを接続。',walletSub:'Reownが接続を処理します。',lockedTitle:'Dashboardはロック中。',lockedSub:'ウォレットを接続してください。',disconnect:'切断',dashTitle:'おかえりなさい 👋',dashSub:'CardTWスペース。',connectedWallet:'接続済みウォレット',networkLabel:'ネットワーク',overview:'概要',access:'アクセス',myCards:'マイカード',quickActions:'クイック操作',recent:'最近のアクティビティ',cardDashboardDesc:'デモカード。',logout:'ログアウト',footer:'プレミアムデモ。'},
  ko:{home:'홈',cards:'카드',how:'작동 방식',wallet:'지갑',connect:'지갑 연결',eyebrow:'암호화폐 카드 · CARDTW',heroTitle:'프리미엄 카드.<br><span>연결된 지갑.</span>',heroSub:'프리미엄 카드와 원활한 지갑 연결을 제공하는 CardTW.',discover:'카드 보기',statCards:'프리미엄 모델',statNetworks:'EVM 네트워크',statAccess:'개인 공간',
    f1t:'간편한 연결',f1p:'Reown 한 번으로 연결.',f2t:'프리미엄 카드',f2p:'세 가지 등급.',f3t:'개인 공간',f3p:'연결 후 대시보드.',f4t:'확장 가능한 구조',f4p:'API와 PostgreSQL 준비.',collectionEyebrow:'카드 컬렉션',collectionTitle:'진짜 프리미엄 카드.',collectionSub:'Royal Blue, Obsidian Black, 24K Gold.',royalCardDesc:'심플하고 고급스럽게.',obsidianCardDesc:'블랙 오브시디언.',goldCardDesc:'울트라 프리미엄 골드.',walletEyebrow:'지갑',walletTitle:'지갑을 연결하세요.',walletSub:'Reown이 연결을 처리합니다.',lockedTitle:'대시보드 잠김.',lockedSub:'지갑을 연결하세요.',disconnect:'연결 해제',dashTitle:'다시 오신 것을 환영합니다 👋',dashSub:'CardTW 공간.',connectedWallet:'연결된 지갑',networkLabel:'네트워크',overview:'개요',access:'접근',myCards:'내 카드',quickActions:'빠른 작업',recent:'최근 활동',cardDashboardDesc:'데모 카드.',logout:'로그아웃',footer:'프리미엄 데모.'},
  ar:{home:'الرئيسية',cards:'البطاقات',how:'كيف يعمل',wallet:'المحفظة',connect:'ربط المحفظة',eyebrow:'بطاقة كريبتو · CARDTW',heroTitle:'بطاقة فاخرة.<br><span>محفظة متصلة.</span>',heroSub:'تجربة CardTW بأسلوب fintech مع بطاقات فاخرة ومساحة شخصية.',discover:'استكشف البطاقات',statCards:'نماذج فاخرة',statNetworks:'شبكات EVM',statAccess:'مساحة شخصية',
    f1t:'اتصال سلس',f1p:'تدفق Reown واحد.',f2t:'بطاقات فاخرة',f2p:'ثلاثة مستويات.',f3t:'مساحة شخصية',f3p:'لوحة التحكم بعد الاتصال.',f4t:'بنية قابلة للتوسع',f4p:'جاهزة للـAPI وPostgreSQL.',collectionEyebrow:'مجموعة البطاقات',collectionTitle:'بطاقات فاخرة فعلاً.',collectionSub:'Royal Blue وObsidian Black و24K Gold.',royalCardDesc:'بسيطة وفاخرة.',obsidianCardDesc:'أوبسيديان أسود.',goldCardDesc:'ذهب فاخر جداً.',walletEyebrow:'المحفظة',walletTitle:'اربط محفظتك.',walletSub:'Reown يتولى الاتصال.',lockedTitle:'لوحة التحكم مقفلة.',lockedSub:'اربط محفظة للمتابعة.',disconnect:'فصل',dashTitle:'مرحباً بعودتك 👋',dashSub:'مساحتك في CardTW.',connectedWallet:'المحفظة المتصلة',networkLabel:'الشبكة',overview:'نظرة عامة',access:'الوصول',myCards:'بطاقاتي',quickActions:'إجراءات سريعة',recent:'النشاط الأخير',cardDashboardDesc:'بطاقة تجريبية.',logout:'تسجيل الخروج',footer:'واجهة تجريبية فاخرة.'},
  hi:{home:'होम',cards:'कार्ड',how:'कैसे काम करता है',wallet:'वॉलेट',connect:'वॉलेट कनेक्ट करें',eyebrow:'क्रिप्टो कार्ड · CARDTW',heroTitle:'प्रीमियम कार्ड।<br><span>कनेक्टेड वॉलेट।</span>',heroSub:'प्रीमियम कार्ड और आसान वॉलेट कनेक्शन के साथ CardTW अनुभव।',discover:'कार्ड देखें',statCards:'प्रीमियम मॉडल',statNetworks:'EVM नेटवर्क',statAccess:'पर्सनल स्पेस',
    f1t:'आसान कनेक्शन',f1p:'एक Reown फ्लो।',f2t:'प्रीमियम कार्ड',f2p:'तीन स्तर।',f3t:'पर्सनल स्पेस',f3p:'कनेक्ट करने के बाद डैशबोर्ड।',f4t:'स्केलेबल आर्किटेक्चर',f4p:'API और PostgreSQL के लिए तैयार.',collectionEyebrow:'कार्ड कलेक्शन',collectionTitle:'वास्तव में प्रीमियम कार्ड.',collectionSub:'Royal Blue, Obsidian Black और 24K Gold.',royalCardDesc:'सिंपल और प्रीमियम.',obsidianCardDesc:'ब्लैक ओब्सीडियन.',goldCardDesc:'अल्ट्रा प्रीमियम गोल्ड.',walletEyebrow:'वॉलेट',walletTitle:'वॉलेट कनेक्ट करें.',walletSub:'Reown कनेक्शन संभालता है.',lockedTitle:'डैशबोर्ड लॉक है.',lockedSub:'आगे बढ़ने के लिए वॉलेट कनेक्ट करें.',disconnect:'डिस्कनेक्ट',dashTitle:'वापस स्वागत है 👋',dashSub:'आपका CardTW स्पेस.',connectedWallet:'कनेक्टेड वॉलेट',networkLabel:'नेटवर्क',overview:'ओवरव्यू',access:'एक्सेस',myCards:'मेरे कार्ड',quickActions:'क्विक एक्शन',recent:'हाल की गतिविधि',cardDashboardDesc:'डेमो कार्ड.',logout:'लॉग आउट',footer:'प्रीमियम डेमो.'}
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.fr
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = dict[el.dataset.i18n] ?? el.textContent })
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = dict[el.dataset.i18nHtml] ?? el.innerHTML })
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  localStorage.setItem('cardtw_lang', lang)
}

function setupLanguage() {
  const select = document.getElementById('language')
  if (!select) return
  const lang = localStorage.getItem('cardtw_lang') || 'fr'
  select.value = lang
  select.addEventListener('change', () => applyLanguage(select.value))
  applyLanguage(lang)
}

function showWalletError(message) {
  const el = document.getElementById('walletError')
  if (el) {
    el.style.display = 'block'
    el.textContent = message
  }
  console.error('[CardTW]', message)
}

function clearWalletError() {
  const el = document.getElementById('walletError')
  if (el) el.style.display = 'none'
}

function networkName(chainId) {
  const map = {'0x1':'Ethereum','0x89':'Polygon','0xa4b1':'Arbitrum','0xa':'Optimism','0x2105':'Base','0x38':'BNB Chain','0xa86a':'Avalanche'}
  return map[chainId] || `Chain ${chainId || '—'}`
}

function renderWallet() {
  if (!modal) return
  const connected = modal.getIsConnected()
  const address = modal.getAddress()
  const chainId = modal.getChainId()
  const status = document.getElementById('walletStatus')
  const addressEl = document.getElementById('walletAddress')
  const dot = document.getElementById('statusDot')
  const dashAddress = document.getElementById('dashAddress')
  const dashNetwork = document.getElementById('dashNetwork')
  const dashboard = document.getElementById('dashboard')
  const locked = document.getElementById('lockedDash')

  if (connected && address) {
    if (status) status.textContent = `Wallet connecté · ${address.slice(0,6)}…${address.slice(-4)}`
    if (addressEl) addressEl.textContent = address
    if (dot) dot.classList.add('connected')
    if (dashAddress) dashAddress.textContent = address
    if (dashNetwork) dashNetwork.textContent = networkName(chainId)
    if (dashboard) dashboard.style.display = 'block'
    if (locked) locked.style.display = 'none'
  } else {
    if (status) status.textContent = 'Wallet non connecté'
    if (addressEl) addressEl.textContent = 'Connectez votre wallet pour commencer.'
    if (dot) dot.classList.remove('connected')
    if (dashboard) dashboard.style.display = 'none'
    if (locked) locked.style.display = 'block'
  }
}

async function openWallet() {
  clearWalletError()
  if (!modal) {
    showWalletError(`Reown n'a pas pu être initialisé. ${initError?.message || ''}`)
    return
  }
  try {
    await modal.open({ view: 'Connect', namespace: 'eip155' })
  } catch (err) {
    showWalletError(`Impossible d'ouvrir le sélecteur Reown. ${err?.message || err}`)
  }
}

function bindWalletButtons() {
  document.querySelectorAll('[data-wallet-connect]').forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.preventDefault()
      openWallet()
    })
  })
  const disconnect = document.getElementById('disconnectBtn')
  if (disconnect) disconnect.addEventListener('click', () => modal?.disconnect())
}

function addRuntimeErrorBanner() {
  if (initError) showWalletError(`Erreur Reown : ${initError.message || initError}`)
}

document.addEventListener('DOMContentLoaded', () => {
  setupLanguage()
  bindWalletButtons()
  renderWallet()
  if (modal) {
    modal.subscribeState(renderWallet)
    modal.subscribeProvider(renderWallet)
  } else {
    addRuntimeErrorBanner()
  }
})
