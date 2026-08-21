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
  url: 'https://ihv08263-pixel.github.io/cardtw/'
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

const translations = {
  fr: {
    navHome:'Accueil', navHow:'Comment ça marche', navCards:'Cartes', navWallet:'Wallet',
    heroEyebrow:'CARTE CRYPTO · CARDTW', heroTitle:'Une carte simple.<br><span>Un wallet connecté.</span>',
    heroSub:'CardTW regroupe vos cartes, votre wallet et vos paiements dans une interface claire. Connectez votre wallet, choisissez une carte et gardez une vue simple sur votre activité.',
    connectLabel:'Connecter le wallet', howLink:'Découvrir le fonctionnement',
    trustSecure:'Connexion sécurisée', trustPublic:'Adresse publique uniquement', trustNetworks:'Multi-réseaux EVM',
    walletEyebrow:'WALLET', walletDisconnected:'Wallet non connecté', walletPrompt:'Connectez votre wallet pour continuer.',
    howTitle:'Tout est pensé pour être simple.', howSub:'Trois étapes suffisent pour commencer avec CardTW.',
    step1Title:'Connectez votre wallet', step2Title:'Choisissez votre carte', step3Title:'Gérez votre espace',
    cardsTitle:'Choisissez le format qui vous convient.', cardsSub:'Faites défiler les offres et ouvrez les limites pour voir les détails.',
    privacyTitle:'Votre wallet reste à vous.', privacyText:'CardTW utilise une connexion de wallet pour récupérer uniquement les informations nécessaires à l’interface. Les clés privées et phrases de récupération restent dans votre wallet.'
  },
  en: {
    navHome:'Home', navHow:'How it works', navCards:'Cards', navWallet:'Wallet',
    heroEyebrow:'CRYPTO CARD · CARDTW', heroTitle:'One simple card.<br><span>One connected wallet.</span>',
    heroSub:'CardTW brings your cards, wallet and payments together in a clean interface. Connect your wallet, choose a card and keep a simple view of your activity.',
    connectLabel:'Connect wallet', howLink:'See how it works',
    trustSecure:'Secure connection', trustPublic:'Public address only', trustNetworks:'Multi-network EVM',
    walletEyebrow:'WALLET', walletDisconnected:'Wallet not connected', walletPrompt:'Connect your wallet to continue.',
    howTitle:'Everything is designed to be simple.', howSub:'Three steps are enough to get started with CardTW.',
    step1Title:'Connect your wallet', step2Title:'Choose your card', step3Title:'Manage your space',
    cardsTitle:'Choose the format that fits you.', cardsSub:'Browse the offers and open the limits to see the details.',
    privacyTitle:'Your wallet stays yours.', privacyText:'CardTW uses your wallet connection only for the information needed by the interface. Private keys and recovery phrases stay in your wallet.'
  },
  es: {
    navHome:'Inicio', navHow:'Cómo funciona', navCards:'Tarjetas', navWallet:'Wallet',
    heroEyebrow:'TARJETA CRYPTO · CARDTW', heroTitle:'Una tarjeta sencilla.<br><span>Una wallet conectada.</span>',
    heroSub:'CardTW reúne tus tarjetas, tu wallet y tus pagos en una interfaz clara. Conecta tu wallet, elige una tarjeta y consulta tu actividad de forma sencilla.',
    connectLabel:'Conectar wallet', howLink:'Ver cómo funciona', trustSecure:'Conexión segura', trustPublic:'Solo dirección pública', trustNetworks:'Múltiples redes EVM',
    walletEyebrow:'WALLET', walletDisconnected:'Wallet no conectada', walletPrompt:'Conecta tu wallet para continuar.',
    howTitle:'Todo está pensado para ser sencillo.', howSub:'Tres pasos para empezar con CardTW.', step1Title:'Conecta tu wallet', step2Title:'Elige tu tarjeta', step3Title:'Gestiona tu espacio',
    cardsTitle:'Elige el formato que más te convenga.', cardsSub:'Explora las ofertas y abre los límites para ver los detalles.', privacyTitle:'Tu wallet sigue siendo tuya.', privacyText:'CardTW utiliza la conexión de tu wallet solo para la información necesaria. Las claves privadas y frases de recuperación permanecen en tu wallet.'
  },
  de: {
    navHome:'Start', navHow:'So funktioniert es', navCards:'Karten', navWallet:'Wallet',
    heroEyebrow:'KRYPTO-KARTE · CARDTW', heroTitle:'Eine einfache Karte.<br><span>Eine verbundene Wallet.</span>',
    heroSub:'CardTW bündelt Karten, Wallet und Zahlungen in einer klaren Oberfläche. Verbinde deine Wallet, wähle eine Karte und behalte deine Aktivitäten im Blick.',
    connectLabel:'Wallet verbinden', howLink:'So funktioniert es', trustSecure:'Sichere Verbindung', trustPublic:'Nur öffentliche Adresse', trustNetworks:'Mehrere EVM-Netzwerke',
    walletEyebrow:'WALLET', walletDisconnected:'Wallet nicht verbunden', walletPrompt:'Verbinde deine Wallet, um fortzufahren.',
    howTitle:'Alles ist einfach gestaltet.', howSub:'Drei Schritte reichen für den Einstieg.', step1Title:'Wallet verbinden', step2Title:'Karte auswählen', step3Title:'Bereich verwalten',
    cardsTitle:'Wähle das passende Format.', cardsSub:'Durchsuche die Angebote und öffne die Limits für Details.', privacyTitle:'Deine Wallet bleibt deine.', privacyText:'CardTW verwendet nur die für die Oberfläche nötigen Wallet-Daten. Private Schlüssel und Wiederherstellungsphrasen bleiben in deiner Wallet.'
  },
  pt: {
    navHome:'Início', navHow:'Como funciona', navCards:'Cartões', navWallet:'Carteira',
    heroEyebrow:'CARTÃO CRYPTO · CARDTW', heroTitle:'Um cartão simples.<br><span>Uma carteira conectada.</span>',
    heroSub:'O CardTW reúne cartões, carteira e pagamentos numa interface clara. Conecte a sua carteira, escolha um cartão e acompanhe a atividade.',
    connectLabel:'Conectar carteira', howLink:'Ver como funciona', trustSecure:'Conexão segura', trustPublic:'Somente endereço público', trustNetworks:'Várias redes EVM',
    walletEyebrow:'CARTEIRA', walletDisconnected:'Carteira não conectada', walletPrompt:'Conecte a sua carteira para continuar.',
    howTitle:'Tudo foi pensado para ser simples.', howSub:'Três passos para começar.', step1Title:'Conecte a carteira', step2Title:'Escolha o cartão', step3Title:'Gerencie o seu espaço',
    cardsTitle:'Escolha o formato ideal.', cardsSub:'Veja as ofertas e abra os limites para detalhes.', privacyTitle:'A sua carteira continua sua.', privacyText:'O CardTW usa apenas as informações necessárias da ligação. As chaves privadas e frases de recuperação ficam na sua carteira.'
  },
  ru: {
    navHome:'Главная', navHow:'Как это работает', navCards:'Карты', navWallet:'Кошелёк',
    heroEyebrow:'КРИПТО-КАРТА · CARDTW', heroTitle:'Простая карта.<br><span>Подключённый кошелёк.</span>',
    heroSub:'CardTW объединяет карты, кошелёк и платежи в понятном интерфейсе. Подключите кошелёк, выберите карту и следите за активностью.',
    connectLabel:'Подключить кошелёк', howLink:'Как это работает', trustSecure:'Безопасное подключение', trustPublic:'Только публичный адрес', trustNetworks:'Несколько EVM-сетей',
    walletEyebrow:'КОШЕЛЁК', walletDisconnected:'Кошелёк не подключён', walletPrompt:'Подключите кошелёк, чтобы продолжить.',
    howTitle:'Всё сделано максимально просто.', howSub:'Три шага для начала.', step1Title:'Подключите кошелёк', step2Title:'Выберите карту', step3Title:'Управляйте пространством',
    cardsTitle:'Выберите подходящий формат.', cardsSub:'Просмотрите предложения и откройте лимиты для деталей.', privacyTitle:'Ваш кошелёк остаётся вашим.', privacyText:'CardTW использует только данные, необходимые интерфейсу. Приватные ключи и seed-фразы остаются в кошельке.'
  },
  tr: {
    navHome:'Ana sayfa', navHow:'Nasıl çalışır', navCards:'Kartlar', navWallet:'Cüzdan',
    heroEyebrow:'KRİPTO KART · CARDTW', heroTitle:'Basit bir kart.<br><span>Bağlı bir cüzdan.</span>',
    heroSub:'CardTW kartlarınızı, cüzdanınızı ve ödemelerinizi sade bir arayüzde birleştirir. Cüzdanınızı bağlayın, kartınızı seçin ve hareketlerinizi görün.',
    connectLabel:'Cüzdanı bağla', howLink:'Nasıl çalıştığını gör', trustSecure:'Güvenli bağlantı', trustPublic:'Yalnızca herkese açık adres', trustNetworks:'Çoklu EVM ağları',
    walletEyebrow:'CÜZDAN', walletDisconnected:'Cüzdan bağlı değil', walletPrompt:'Devam etmek için cüzdanınızı bağlayın.',
    howTitle:'Her şey basit olacak şekilde tasarlandı.', howSub:'Başlamak için üç adım yeterli.', step1Title:'Cüzdanı bağla', step2Title:'Kartını seç', step3Title:'Alanını yönet',
    cardsTitle:'Size uygun formatı seçin.', cardsSub:'Tekliflere göz atın ve ayrıntılar için limitleri açın.', privacyTitle:'Cüzdanınız size ait.', privacyText:'CardTW yalnızca arayüz için gereken bilgileri kullanır. Özel anahtarlar ve kurtarma ifadeleri cüzdanınızda kalır.'
  },
  zh: {
    navHome:'首页', navHow:'使用方式', navCards:'卡片', navWallet:'钱包',
    heroEyebrow:'加密卡 · CARDTW', heroTitle:'一张简单的卡。<br><span>一个已连接的钱包。</span>',
    heroSub:'CardTW 将卡片、钱包和支付整合到清晰的界面中。连接钱包、选择卡片并查看活动。',
    connectLabel:'连接钱包', howLink:'了解使用方式', trustSecure:'安全连接', trustPublic:'仅使用公开地址', trustNetworks:'多条 EVM 网络',
    walletEyebrow:'钱包', walletDisconnected:'钱包未连接', walletPrompt:'连接钱包以继续。',
    howTitle:'一切都为了简单而设计。', howSub:'三步即可开始使用 CardTW。', step1Title:'连接钱包', step2Title:'选择卡片', step3Title:'管理空间',
    cardsTitle:'选择适合你的卡片类型。', cardsSub:'浏览方案并展开额度查看详情。', privacyTitle:'钱包始终属于你。', privacyText:'CardTW 只使用界面所需的钱包信息。私钥和助记词始终保留在你的钱包中。'
  },
  ja: {
    navHome:'ホーム', navHow:'使い方', navCards:'カード', navWallet:'ウォレット',
    heroEyebrow:'暗号資産カード · CARDTW', heroTitle:'シンプルなカード。<br><span>接続されたウォレット。</span>',
    heroSub:'CardTW はカード、ウォレット、支払いをわかりやすくまとめます。ウォレットを接続してカードを選び、アクティビティを確認できます。',
    connectLabel:'ウォレットを接続', howLink:'使い方を見る', trustSecure:'安全な接続', trustPublic:'公開アドレスのみ', trustNetworks:'複数の EVM ネットワーク',
    walletEyebrow:'ウォレット', walletDisconnected:'ウォレット未接続', walletPrompt:'続行するにはウォレットを接続してください。',
    howTitle:'すべてをシンプルに。', howSub:'CardTW は3ステップで開始できます。', step1Title:'ウォレットを接続', step2Title:'カードを選択', step3Title:'スペースを管理',
    cardsTitle:'あなたに合うカードを選択。', cardsSub:'プランを見て、詳細の上限を開いてください。', privacyTitle:'ウォレットはあなたのもの。', privacyText:'CardTW は画面に必要なウォレット情報のみを使用します。秘密鍵とリカバリーフレーズはウォレット内に残ります。'
  },
  ko: {
    navHome:'홈', navHow:'사용 방법', navCards:'카드', navWallet:'지갑',
    heroEyebrow:'암호화폐 카드 · CARDTW', heroTitle:'간단한 카드.<br><span>연결된 지갑.</span>',
    heroSub:'CardTW는 카드, 지갑, 결제를 깔끔한 화면에 모아줍니다. 지갑을 연결하고 카드를 선택한 후 활동을 확인하세요.',
    connectLabel:'지갑 연결', howLink:'사용 방법 보기', trustSecure:'안전한 연결', trustPublic:'공개 주소만 사용', trustNetworks:'다중 EVM 네트워크',
    walletEyebrow:'지갑', walletDisconnected:'지갑이 연결되지 않음', walletPrompt:'계속하려면 지갑을 연결하세요.',
    howTitle:'모든 것을 간단하게 설계했습니다.', howSub:'CardTW는 세 단계로 시작합니다.', step1Title:'지갑 연결', step2Title:'카드 선택', step3Title:'공간 관리',
    cardsTitle:'원하는 카드 형식을 선택하세요.', cardsSub:'상품을 보고 한도를 열어 자세한 내용을 확인하세요.', privacyTitle:'지갑은 당신의 것입니다.', privacyText:'CardTW는 인터페이스에 필요한 정보만 사용합니다. 개인 키와 복구 문구는 지갑에 남습니다.'
  },
  ar: {
    navHome:'الرئيسية', navHow:'كيف يعمل', navCards:'البطاقات', navWallet:'المحفظة',
    heroEyebrow:'بطاقة عملات رقمية · CARDTW', heroTitle:'بطاقة بسيطة.<br><span>محفظة متصلة.</span>',
    heroSub:'يجمع CardTW البطاقات والمحفظة والمدفوعات في واجهة واضحة. صِل محفظتك، اختر البطاقة وتابع نشاطك.',
    connectLabel:'توصيل المحفظة', howLink:'اكتشف كيف يعمل', trustSecure:'اتصال آمن', trustPublic:'العنوان العام فقط', trustNetworks:'شبكات EVM متعددة',
    walletEyebrow:'المحفظة', walletDisconnected:'المحفظة غير متصلة', walletPrompt:'صِل محفظتك للمتابعة.',
    howTitle:'كل شيء مصمم ليكون بسيطاً.', howSub:'ثلاث خطوات تكفي للبدء.', step1Title:'صِل محفظتك', step2Title:'اختر بطاقتك', step3Title:'أدر مساحتك',
    cardsTitle:'اختر الشكل المناسب لك.', cardsSub:'تصفح العروض وافتح الحدود لرؤية التفاصيل.', privacyTitle:'محفظتك تبقى ملكك.', privacyText:'يستخدم CardTW فقط المعلومات اللازمة للواجهة. تبقى المفاتيح الخاصة وعبارات الاسترداد داخل محفظتك.'
  },
  hi: {
    navHome:'होम', navHow:'कैसे काम करता है', navCards:'कार्ड', navWallet:'वॉलेट',
    heroEyebrow:'क्रिप्टो कार्ड · CARDTW', heroTitle:'एक सरल कार्ड।<br><span>एक कनेक्टेड वॉलेट।</span>',
    heroSub:'CardTW आपके कार्ड, वॉलेट और भुगतान को एक साफ इंटरफेस में लाता है। वॉलेट कनेक्ट करें, कार्ड चुनें और गतिविधि देखें।',
    connectLabel:'वॉलेट कनेक्ट करें', howLink:'कैसे काम करता है देखें', trustSecure:'सुरक्षित कनेक्शन', trustPublic:'केवल सार्वजनिक पता', trustNetworks:'मल्टी-नेटवर्क EVM',
    walletEyebrow:'वॉलेट', walletDisconnected:'वॉलेट कनेक्ट नहीं है', walletPrompt:'जारी रखने के लिए वॉलेट कनेक्ट करें।',
    howTitle:'सब कुछ आसान बनाने के लिए डिजाइन किया गया है।', howSub:'CardTW शुरू करने के लिए तीन कदम।', step1Title:'वॉलेट कनेक्ट करें', step2Title:'कार्ड चुनें', step3Title:'अपना स्पेस मैनेज करें',
    cardsTitle:'अपने लिए सही फॉर्मेट चुनें।', cardsSub:'ऑफर देखें और विवरण के लिए लिमिट खोलें।', privacyTitle:'आपका वॉलेट आपका ही रहता है।', privacyText:'CardTW केवल इंटरफेस के लिए जरूरी वॉलेट जानकारी का उपयोग करता है। निजी कुंजी और रिकवरी वाक्य वॉलेट में ही रहते हैं।'
  }
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.fr
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n
    if (dict[key] != null) el.innerHTML = dict[key]
  })
  localStorage.setItem('cardtw_language', lang)
}

const langSelect = document.getElementById('languageSelect')
const savedLang = localStorage.getItem('cardtw_language') || 'fr'
if (langSelect) {
  langSelect.value = translations[savedLang] ? savedLang : 'fr'
  langSelect.addEventListener('change', () => applyLanguage(langSelect.value))
}
applyLanguage(langSelect?.value || 'fr')

const shortAddress = (address) =>
  address ? `${address.slice(0, 6)}…${address.slice(-4)}` : ''

function renderWallet({ isConnected, address, chainId } = {}) {
  const status = document.getElementById('cardtwWalletStatus')
  const addressEl = document.getElementById('cardtwWalletAddress')
  if (!status || !addressEl) return

  const connected = isConnected ?? modal.getIsConnected()
  const currentAddress = address ?? modal.getAddress()
  const currentChainId = chainId ?? modal.getChainId()

  if (connected && currentAddress) {
    status.textContent = `Wallet connecté · ${shortAddress(currentAddress)}`
    addressEl.textContent = `Adresse : ${currentAddress}${currentChainId ? ` · Chain ID ${currentChainId}` : ''}`
  } else {
    const dict = translations[langSelect?.value || 'fr'] || translations.fr
    status.textContent = dict.walletDisconnected
    addressEl.textContent = dict.walletPrompt
  }
}

function openConnect() {
  modal.open({ view: 'Connect', namespace: 'eip155' })
}

document.querySelectorAll('[data-wallet-connect]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    if (modal.getIsConnected()) modal.open({ view: 'Account' })
    else openConnect()
  })
})

modal.subscribeProvider((state) => {
  renderWallet(state)
})

modal.subscribeState(() => {
  renderWallet()
})

renderWallet()
