const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonicPhrase = "jupiter mountains supernatural bird uranus optimus const origami build platon pluton desktop mountains supernatural bird jupiter uranus optimus const origami build platon pluton desktop"
const INFURA_API_KEY = "9a70ef9cb5ea429d9b9f38526a743b6b"

// console.log(mnemonicPhrase);
// console.log(INFURA_API_KEY);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },

    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase
          },
          providerOrUrl:"https://ropsten.infura.io/v3/"+ INFURA_API_KEY,
          numberOfAddresses: 1,
          shareNonce: true,
          derivationPath: "m/44'/1'/0'/0/"
        }),
      network_id: '3',
    }
  },

  

};