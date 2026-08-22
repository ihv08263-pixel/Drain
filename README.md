# CardTW

Clean premium frontend for CardTW, prepared as the new baseline for the repository.

## Included

- Premium CardTW landing page
- Premium card visuals
- Wallet connection via Reown AppKit
- Multi-wallet EVM connection
- Multilingual UI
- Public dashboard preview
- User dashboard unlocked after wallet connection
- `contracts/CardTWTestSettlement.sol` for the two-wallet self-test
- `admin.html` for the frontend-only test dashboard

## Repository layout

```text
cardtw/
├── .github/workflows/pages.yml
├── assets/
├── contracts/
│   ├── CardTWTestSettlement.sol
│   └── README.md
├── src/
│   └── main.js
├── admin.html
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

GitHub Pages is only the current deployment target. The production plan is to move the frontend, backend API, admin backend and PostgreSQL database to the VPS.

The admin page's frontend credentials are for testing only and are not production authentication.
