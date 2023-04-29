//SPDX-License-Identiifer: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ERC20Swapper {
    function swapEtherToToken(address token, uint minAmount) external payable returns (uint);
}

//error
error EtherToErc20Swapper__EthNotSent();
error EtherToERC20Swappper__InnsufficientAmount();

contract EtherToERC20Swappper is ERC20Swapper {

    function swapEtherToToken(
        address token,
        uint minAmount
    ) external payable override returns (uint) {
         // Ensure that the caller has sent Ether
        if(msg.value < 0) {
            revert EtherToErc20Swapper__EthNotSent();
        }

        // Retrieve the ERC-20 contract instance
        IERC20 erc20 = IERC20(token);

        // Calculate the expected amount of tokens to receive
        uint expectedAmount = msg.value;

        // Ensure that the ERC-20 contract has sufficient balance
        if(expectedAmount < erc20.balanceOf(address(this))){

            revert EtherToERC20Swappper__InnsufficientAmount();
        }

        // Transfer the tokens to the caller
        erc20.transfer(msg.sender, expectedAmount);

        // Return the actual amount of transferred tokens
        return expectedAmount;
    }
}