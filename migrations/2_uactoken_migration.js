const UToken = artifacts.require("UToken");

const name = 'UToken';
const symbol = 'UT';
const decimals = '18';
const initialSupply = '100000000';
module.exports = function(deployer) {
  deployer.deploy(UToken, name, symbol, decimals, initialSupply);
};
