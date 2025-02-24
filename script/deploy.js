const hre = require("hardhat")

async function main() {
    const Todolist = await hre.ethers.getContractFactory("Todolist")

    console.log("Deploying Todolist...");

    const todolist = await Todolist.deploy()

    await todolist.waitForDeployment()

    console.log("Todolist deployed to: ", await todolist.getAddress());
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })