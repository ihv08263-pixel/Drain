
const toast = (m) => {
  const t = document.querySelector('#toast');
  t.textContent = m;
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
};

let wallet = {
  provider: null,
  address: localStorage.getItem('cardtw_wallet_address') || null,
  chainId: null
};

const short = (a) => a ? `${a.slice(0,6)}…${a.slice(-4)}` : '—';
const eth = (hex) => Number.parseFloat((Number(BigInt(hex)) / 1e18).toFixed(6));

function getProvider() {
  return window.ethereum || null;
}

async function connectWallet() {
  const provider = getProvider();
  if (!provider) {
    toast('Aucun wallet compatible détecté. Ouvre CardTW dans un navigateur avec un wallet.');
    return;
  }
  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    if (!accounts?.length) return;
    wallet.provider = provider;
    wallet.address = accounts[0];
    wallet.chainId = await provider.request({ method: 'eth_chainId' });
    localStorage.setItem('cardtw_wallet_address', wallet.address);
    renderWallet();
    await refreshWallet();
    toast('Wallet connecté.');
  } catch (e) {
    if (e?.code === 4001) toast('Connexion refusée dans le wallet.');
    else toast('Connexion impossible.');
  }
}

function disconnectWallet() {
  wallet.address = null;
  wallet.chainId = null;
  wallet.provider = null;
  localStorage.removeItem('cardtw_wallet_address');
  renderWallet();
  toast('Wallet déconnecté de cette interface.');
}

async function refreshWallet() {
  if (!wallet.address) return;
  const provider = wallet.provider || getProvider();
  if (!provider) {
    renderWallet();
    return;
  }
  wallet.provider = provider;
  try {
    const [balance, chainId] = await Promise.all([
      provider.request({ method: 'eth_getBalance', params: [wallet.address, 'latest'] }),
      provider.request({ method: 'eth_chainId' })
    ]);
    wallet.chainId = chainId;
    document.querySelector('#walletBalance').textContent = `${eth(balance)} ETH`;
    document.querySelector('#walletNetwork').textContent = `Réseau ${networkName(chainId)}`;
    renderWallet();
  } catch {
    toast('Impossible de récupérer le solde.');
  }
}

function networkName(id) {
  const names = {
    '0x1':'Ethereum Mainnet',
    '0x38':'BNB Smart Chain',
    '0x89':'Polygon',
    '0xa':'Optimism',
    '0xa4b1':'Arbitrum One',
    '0x2105':'Base'
  };
  return names[id] || id || 'inconnu';
}

function renderWallet() {
  const connected = !!wallet.address;
  const status = document.querySelector('#walletStatus');
  const dot = document.querySelector('#walletDot');
  const address = document.querySelector('#walletAddress');
  const copy = document.querySelector('#copyAddress');
  const connect = document.querySelector('#connectWallet');
  const disconnect = document.querySelector('#disconnectWallet');
  status.textContent = connected ? `Connecté · ${short(wallet.address)}` : 'Non connecté';
  dot.parentElement.classList.toggle('connected', connected);
  address.textContent = connected ? wallet.address : '—';
  copy.disabled = !connected;
  disconnect.hidden = !connected;
  connect.textContent = connected ? 'Wallet connecté' : 'Connecter le wallet';
  if (!connected) {
    document.querySelector('#walletBalance').textContent = '—';
    document.querySelector('#walletNetwork').textContent = 'Réseau —';
  }
}

async function copyText(text) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    toast('Adresse copiée.');
  } catch { toast('Copie impossible.'); }
}

function openModal(id) { document.querySelector('#'+id).classList.add('open'); }
function closeModal(id) { document.querySelector('#'+id).classList.remove('open'); }

async function sendTransaction() {
  if (!wallet.address) { toast('Connecte d’abord ton wallet.'); return; }
  const provider = wallet.provider || getProvider();
  if (!provider) { toast('Wallet indisponible.'); return; }
  const to = document.querySelector('#sendTo').value.trim();
  const amount = document.querySelector('#sendAmount').value.trim();
  if (!/^0x[a-fA-F0-9]{40}$/.test(to)) { toast('Adresse destinataire invalide.'); return; }
  if (!amount || Number(amount) <= 0) { toast('Montant invalide.'); return; }
  try {
    const wei = '0x' + BigInt(Math.round(Number(amount) * 1e18)).toString(16);
    const txHash = await provider.request({
      method: 'eth_sendTransaction',
      params: [{ from: wallet.address, to, value: wei }]
    });
    closeModal('sendModal');
    document.querySelector('#sendTo').value = '';
    document.querySelector('#sendAmount').value = '';
    toast(`Transaction envoyée · ${short(txHash)}`);
    await refreshWallet();
  } catch (e) {
    if (e?.code === 4001) toast('Transaction refusée dans le wallet.');
    else toast('Transaction non envoyée.');
  }
}

document.querySelector('#connectWallet').onclick = connectWallet;
document.querySelector('#disconnectWallet').onclick = disconnectWallet;
document.querySelector('#refreshWallet').onclick = refreshWallet;
document.querySelector('#copyAddress').onclick = () => copyText(wallet.address);
document.querySelector('#receiveBtn').onclick = () => {
  if (!wallet.address) { toast('Connecte d’abord ton wallet.'); return; }
  document.querySelector('#receiveAddress').textContent = wallet.address;
  openModal('receiveModal');
};
document.querySelector('#copyReceive').onclick = () => copyText(wallet.address);
document.querySelector('#sendBtn').onclick = () => {
  if (!wallet.address) { toast('Connecte d’abord ton wallet.'); return; }
  openModal('sendModal');
};
document.querySelector('#confirmSend').onclick = sendTransaction;
document.querySelectorAll('.modal-close').forEach(b => b.onclick = () => closeModal(b.dataset.close));
document.querySelectorAll('.modal').forEach(m => m.onclick = e => { if (e.target === m) m.classList.remove('open'); });

document.querySelector('#account').onclick = () => location.hash='account';
document.querySelector('#lang').onclick = () => toast('FR est la langue active.');
document.querySelectorAll('.manage').forEach(b => b.onclick = () => toast('Options de carte ouvertes.'));
document.querySelectorAll('[data-msg]').forEach(b => b.onclick = () => toast(b.dataset.msg));
document.querySelector('#help').onclick = () => location.hash='faq';
document.querySelector('#profile').onclick = () => toast('Édition du profil — à connecter plus tard.');

const modal = document.querySelector('#modal');
document.querySelector('#add').onclick = () => modal.classList.add('open');
document.querySelector('#close').onclick = () => modal.classList.remove('open');
modal.onclick = e => { if (e.target === modal) modal.classList.remove('open'); };
document.querySelector('#create').onclick = () => {
  let n = document.querySelector('#name').value.trim() || 'Nouvelle carte';
  modal.classList.remove('open');
  document.querySelector('#name').value = '';
  toast(n + ' créée dans la démo.');
};
document.querySelector('#clear').onclick = () => {
  document.querySelector('#activityList').innerHTML = '<div><b>✓</b><span><strong>Démo effacée</strong><small>Historique local supprimé.</small></span><strong>—</strong></div>';
  toast('Activité effacée.');
};
document.querySelector('#compact').onchange = e => document.body.classList.toggle('compact', e.target.checked);
document.querySelector('#motion').onchange = e => document.body.classList.toggle('no-motion', !e.target.checked);

if (window.ethereum) {
  window.ethereum.on?.('accountsChanged', (accounts) => {
    if (accounts?.length) {
      wallet.address = accounts[0];
      localStorage.setItem('cardtw_wallet_address', wallet.address);
      renderWallet();
      refreshWallet();
    } else disconnectWallet();
  });
  window.ethereum.on?.('chainChanged', () => refreshWallet());
}

renderWallet();
if (wallet.address && window.ethereum) {
  wallet.provider = window.ethereum;
  refreshWallet();
}
