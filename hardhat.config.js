require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-web3")
require("dotenv").config()


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths : {
    artifacts: '.src/cache/abis'
  },
  networks: { 
    hardhat: {
      chainId: 31337
    }
  }
};
