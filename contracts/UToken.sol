// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UToken is ERC20 {

    /**
     * @dev The Admin Address.
     */
    address public adminAddress;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply
    ) ERC20(_name, _symbol) public {
        adminAddress = msg.sender;
        _setupDecimals(_decimals);
        _mint(adminAddress, _initialSupply);
    }
}