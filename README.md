# CardTW — wallet + test authorization

This version keeps the working Reown wallet connection and adds an ERC-20 authorization test on **Sepolia only**.

- Connect wallet with Reown AppKit.
- Enter a test ERC-20 token address and a spender/test contract address.
- Read the current allowance.
- Request a maximum allowance of 100,000 token units.
- Revoke the allowance back to zero.
- The wallet signs the approve/revoke transaction.
- No private key or recovery phrase is requested or stored.

Use test tokens/contracts only.
