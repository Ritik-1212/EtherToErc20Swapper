require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require('solidity-coverage');
require("hardhat-deploy");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {
        chainId: 31337
      },
      localhost: {
        chainId: 31337
      },
      sepolia: {
        url: SEPOLIA_RPC_URL,
        accounts: [PRIVATE_KEY],
        chainId: 11155111
      },
  },
  namedAccounts: {
    deployer : {
        default: 0,
        1: 0,
    }
  },
  mocha: {
    timeout: 5000000,
  }
};
