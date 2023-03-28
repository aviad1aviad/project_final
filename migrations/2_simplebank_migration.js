const simplebank = artifacts.require("simplebank");
 
module.exports = function (deployer) {
  deployer.deploy(simplebank);
};

