# CardTWTestSettlement

Test-only settlement contract for two wallets you control.

Flow:
1. Deploy with Wallet B (the settlement operator/owner).
2. In CardTW, Wallet A approves this contract as spender for up to 100,000 token units.
3. Call `settle(token, WalletA, WalletB, amount)` from Wallet B.
4. The token contract performs `transferFrom` and the token balance moves on-chain.

The contract is intentionally owner-restricted so arbitrary visitors cannot call the settlement function.

Use only with wallets and funds you control, and start with a very small amount.
