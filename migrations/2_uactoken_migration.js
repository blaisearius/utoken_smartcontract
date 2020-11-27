const UACToken = artifacts.require("UACToken");

const name = 'UACToken';
const symbol = 'UACT';
const decimals = '18';
const initialSupply = '100000000';
module.exports = function(deployer) {
  deployer.deploy(UACToken, name, symbol, decimals, initialSupply);
};
