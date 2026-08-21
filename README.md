# CardTW + Reown AppKit

Version CardTW avec connexion wallet via Reown AppKit.

- Connexion EVM via WalletConnect/Reown
- Modal multi-wallet
- MetaMask, Trust Wallet, Coinbase, Ledger et autres wallets compatibles selon disponibilité
- Réseaux : Ethereum, Arbitrum, Base, Polygon, Optimism, BNB Chain et Avalanche
- Adresse publique affichée après connexion
- Aucun stockage de clé privée ou seed phrase
- Aucun transfert ni mécanisme d'autorisation de dépense dans cette étape

## GitHub Pages

Cette version utilise Vite et le workflow `.github/workflows/pages.yml`.
Le `base` Vite est configuré pour `/cardtw/`.

Le Project ID Reown est utilisé côté frontend. Aucun secret Reown n'est nécessaire ici.
