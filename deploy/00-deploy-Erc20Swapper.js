const { network } = require("hardhat");
const { developmentChains } = require("../helper.hardhat.config");
const { verify } = require("../utils/verify");



module.exports = async ({getNamedAccounts, deployments}) => {

    const {deploy , log } = deployments;
    const {deployer} = await getNamedAccounts();

    log("deploying......................");
    
    const ERC20Swapper = await deploy("ERC20Swapper", {
        from: deployer,
        args: [],
        log: true,
    });

    if(!developmentChains.includes(network.name)){

        log("verifying................");

        await verify(ERC20Swapper.address, []);
    }
     
}

module.exports.tags = ["all", "ERC20Swapper"];