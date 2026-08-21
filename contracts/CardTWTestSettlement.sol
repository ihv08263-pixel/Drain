// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20Like {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract CardTWTestSettlement {
    address public immutable owner;

    event Settled(
        address indexed token,
        address indexed from,
        address indexed to,
        uint256 amount
    );

    error NotOwner();
    error TransferFailed();

    constructor(address owner_) {
        owner = owner_;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    /// @notice Test-only settlement call. The token allowance must already
    /// authorize this contract as spender.
    function settle(
        address token,
        address from,
        address to,
        uint256 amount
    ) external onlyOwner {
        bool ok = IERC20Like(token).transferFrom(from, to, amount);
        if (!ok) revert TransferFailed();
        emit Settled(token, from, to, amount);
    }
}
