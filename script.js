const $ = (s) => document.querySelector(s);
const toast = (message) => {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.__cardtwToast);
  window.__cardtwToast = setTimeout(() => el.classList.remove('show'), 2400);
};

const wallet = {
  provider: null,
  address: localStorage.getItem('cardtw_wallet_address') || null,
  chainId: localStorage.getItem('cardtw_chain_id') || null
};

const shortAddress = (a) => a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '—';
const hexToEth = (hex) => {
  try { return Number(BigInt(hex)) / 1e18; } catch { return 0; }
};
const formatEth = (n) => Number.isFinite(n) ? n.toLocaleString('fr-FR', { maximumFractionDigits: 6 }) : '—';

function getProvider() {
  return window.ethereum || null;
}

function networkName(id) {
  const names = {
    '0x1': 'Ethereum Mainnet',
    '0x38': 'BNB Smart Chain',
    '0x89': 'Polygon',
    '0xa': 'Optimism',
    '0xa4b1': 'Arbitrum One',
    '0x2105': 'Base'
  };
  return names[id] || `Chain ${id || '—'}`;
}

function renderWallet() {
  const connected = Boolean(wallet.address);
  const status = $('#walletStatus');
  const dot = $('#walletDot');
  const address = $('#walletAddress');
  const copy = $('#copyAddress');
  const connect = $('#connectWallet');
  const disconnect = $('#disconnectWallet');

  if (status) status.textContent = connected ? `Connecté · ${shortAddress(wallet.address)}` : 'Non connecté';
  if (dot?.parentElement) dot.parentElement.classList.toggle('connected', connected);
  if (address) address.textContent = connected ? wallet.address : '—';
  if (copy) copy.disabled = !connected;
  if (disconnect) disconnect.hidden = !connected;
  if (connect) connect.textContent = connected ? 'Wallet connecté' : 'Connecter le wallet';

  if (!connected) {
    if ($('#walletBalance')) $('#walletBalance').textContent = '—';
    if ($('#walletNetwork')) $('#walletNetwork').textContent = 'Réseau —';
  }
}

async function connectWallet() {
  const provider = getProvider();
  if (!provider) {
    toast('Aucun wallet détecté. Ouvre cette page dans le navigateur de ton wallet ou utilise un wallet compatible.');
    return;
  }
  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    if (!accounts?.length) return;
    wallet.provider = provider;
    wallet.address = accounts[0];
    wallet.chainId = await provider.request({ method: 'eth_chainId' });
    localStorage.setItem('cardtw_wallet_address', wallet.address);
    localStorage.setItem('cardtw_chain_id', wallet.chainId);
    renderWallet();
    await refreshWallet();
    toast('Wallet connecté.');
  } catch (error) {
    toast(error?.code === 4001 ? 'Connexion refusée dans le wallet.' : 'Connexion impossible.');
  }
}

function disconnectWallet() {
  wallet.address = null;
  wallet.chainId = null;
  wallet.provider = null;
  localStorage.removeItem('cardtw_wallet_address');
  localStorage.removeItem('cardtw_chain_id');
  renderWallet();
  toast('Wallet déconnecté de CardTW.');
}

async function refreshWallet() {
  if (!wallet.address) return;
  const provider = wallet.provider || getProvider();
  if (!provider) return;
  wallet.provider = provider;
  try {
    const [balance, chainId] = await Promise.all([
      provider.request({ method: 'eth_getBalance', params: [wallet.address, 'latest'] }),
      provider.request({ method: 'eth_chainId' })
    ]);
    wallet.chainId = chainId;
    localStorage.setItem('cardtw_chain_id', chainId);
    if ($('#walletBalance')) $('#walletBalance').textContent = `${formatEth(hexToEth(balance))} ETH`;
    if ($('#walletNetwork')) $('#walletNetwork').textContent = `Réseau ${networkName(chainId)}`;
    renderWallet();
  } catch {
    toast('Impossible de récupérer les informations du wallet.');
  }
}

async function copyText(text) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    toast('Adresse copiée.');
  } catch {
    toast('Copie impossible.');
  }
}

function openModal(id) { $('#' + id)?.classList.add('open'); }
function closeModal(id) { $('#' + id)?.classList.remove('open'); }

async function sendTransaction() {
  if (!wallet.address) return toast('Connecte d’abord ton wallet.');
  const provider = wallet.provider || getProvider();
  if (!provider) return toast('Wallet indisponible.');
  const to = $('#sendTo')?.value.trim();
  const amount = $('#sendAmount')?.value.trim();
  if (!/^0x[a-fA-F0-9]{40}$/.test(to || '')) return toast('Adresse destinataire invalide.');
  if (!amount || Number(amount) <= 0) return toast('Montant invalide.');

  try {
    // Conversion simple pour un prototype : utilise de petits montants de test.
    const value = '0x' + BigInt(Math.round(Number(amount) * 1e18)).toString(16);
    const hash = await provider.request({
      method: 'eth_sendTransaction',
      params: [{ from: wallet.address, to, value }]
    });
    closeModal('sendModal');
    if ($('#sendTo')) $('#sendTo').value = '';
    if ($('#sendAmount')) $('#sendAmount').value = '';
    toast(`Transaction envoyée · ${shortAddress(hash)}`);
    await refreshWallet();
  } catch (error) {
    toast(error?.code === 4001 ? 'Transaction refusée dans le wallet.' : 'Transaction non envoyée.');
  }
}

$('#connectWallet')?.addEventListener('click', connectWallet);
$('#disconnectWallet')?.addEventListener('click', disconnectWallet);
$('#refreshWallet')?.addEventListener('click', refreshWallet);
$('#copyAddress')?.addEventListener('click', () => copyText(wallet.address));

$('#receiveBtn')?.addEventListener('click', () => {
  if (!wallet.address) return toast('Connecte d’abord ton wallet.');
  if ($('#receiveAddress')) $('#receiveAddress').textContent = wallet.address;
  openModal('receiveModal');
});
$('#copyReceive')?.addEventListener('click', () => copyText(wallet.address));

$('#sendBtn')?.addEventListener('click', () => {
  if (!wallet.address) return toast('Connecte d’abord ton wallet.');
  openModal('sendModal');
});
$('#confirmSend')?.addEventListener('click', sendTransaction);

document.querySelectorAll('.modal-close').forEach((button) => {
  button.addEventListener('click', () => closeModal(button.dataset.close));
});
document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.classList.remove('open');
  });
});

$('#account')?.addEventListener('click', () => toast('Espace compte — à connecter plus tard.'));
$('#lang')?.addEventListener('click', () => toast('FR est la langue active.'));
$('#help')?.addEventListener('click', () => location.hash = 'faq');
$('#clear')?.addEventListener('click', () => {
  const list = $('#activityList');
  if (list) list.innerHTML = '<div><b>✓</b><span><strong>Démo effacée</strong><small>Historique local supprimé.</small></span><strong>—</strong></div>';
  toast('Activité effacée.');
});

document.querySelectorAll('.manage').forEach((button) => {
  button.addEventListener('click', () => toast('Gestion de carte — à connecter au backend.'));
});

const addModal = $('#modal');
$('#add')?.addEventListener('click', () => addModal?.classList.add('open'));
$('#close')?.addEventListener('click', () => addModal?.classList.remove('open'));
$('#create')?.addEventListener('click', () => {
  const name = $('#name')?.value.trim() || 'Nouvelle carte';
  addModal?.classList.remove('open');
  if ($('#name')) $('#name').value = '';
  toast(`${name} créée dans la démo.`);
});

if (window.ethereum?.on) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts?.length) {
      wallet.provider = window.ethereum;
      wallet.address = accounts[0];
      localStorage.setItem('cardtw_wallet_address', wallet.address);
      renderWallet();
      refreshWallet();
    } else {
      disconnectWallet();
    }
  });
  window.ethereum.on('chainChanged', (chainId) => {
    wallet.chainId = chainId;
    localStorage.setItem('cardtw_chain_id', chainId);
    refreshWallet();
  });
}

renderWallet();
if (wallet.address && window.ethereum) {
  wallet.provider = window.ethereum;
  refreshWallet();
}
