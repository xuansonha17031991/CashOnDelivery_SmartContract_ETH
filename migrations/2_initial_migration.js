const Sell = artifacts.require("Sell");

module.exports = function(deployer) {
  deployer.deploy(Sell);
};
