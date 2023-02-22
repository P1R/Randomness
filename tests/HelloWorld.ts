import { expect } from "chai";
import { ethers } from "hardhat";
import { HelloWorld } from "../typechain-types";

//// https://github.com/dethcrypto/TypeChain
//
//// https://mochajs.org/#getting-started
//describe("HelloWorld", function () {
//  let helloWorldContract: HelloWorld;
//}

describe("Hello World", () => {
  let helloWorldContract: HelloWorld ;
  before( async () => {
    const helloWorldContractFactory = await ethers.getContractFactory("HelloWorld");
    helloWorldContract = await helloWorldContractFactory.deploy();
    await helloWorldContract.deployed();
  } )
  it("Should return Hello Word!", async () => {
    const text = await helloWorldContract.helloWorld();
    expect(text).to.eq("Hello World");
  }) 
  it("Should set owner to deployer account", async () =>{ 
    const signers = await ethers.getSigners();
    const deployerAccount  = signers[0];
    const owner  = await helloWorldContract.owner();
    expect(owner).to.eq(deployerAccount.address);
  })
})
