import { expect } from "chai";
import { ethers } from "hardhat";
// https://github.com/dethcrypto/TypeChain
import { HelloWorld } from "../typechain-types";

// https://mochajs.org/#getting-started
describe("HelloWorld", function () {
  let helloWorldContract: HelloWorld;
  let accounts = [];

  // https://mochajs.org/#hooks
  beforeEach(async function () {
    // https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#helpers
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    // https://docs.ethers.io/v5/api/contract/contract-factory/#ContractFactory-deploy
    helloWorldContract = await helloWorldFactory.deploy() as HelloWorld;
    // https://docs.ethers.io/v5/api/contract/contract/#Contract-deployed
    await helloWorldContract.deployed();
    // https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#helpers
    accounts = await ethers.getSigners();
  });

  it("Should give a Hello World", async function () {
    // https://docs.ethers.io/v5/api/contract/contract/#Contract-functionsCall
    const helloWorldText = await helloWorldContract.helloWorld();
    // https://www.chaijs.com/api/bdd/#method_equal
    expect(helloWorldText).to.equal("Hello World");
  });

  it("Should set owner to deployer account", async function () {
    // https://docs.ethers.io/v5/api/contract/contract/#Contract-functionsCall
    const contractOwner = await helloWorldContract.owner();
    // https://www.chaijs.com/api/bdd/#method_equal
    expect(contractOwner).to.equal(accounts[0].address);
  });

  it("Should not allow anyone other than owner to call transferOwnership", async function () {
    // https://docs.ethers.io/v5/api/contract/contract/#Contract-connect
    // https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend
    // https://hardhat.org/hardhat-chai-matchers/docs/overview#reverts
    await expect(
      helloWorldContract
        .connect(accounts[1])
        .transferOwnership(accounts[1].address)
    ).to.be.revertedWith("Caller is not the owner");
  });

  it("Should execute transferOwnership correctly", async function () {
    // First we transfer ownership to the account 1 from acccount 0
    // console.log( await helloWorldContract.owner())
    const transfer = await helloWorldContract.transferOwnership(accounts[1].address);
    // Expect that the owner is the account 1 to whom we transfer the ownership
    await expect( await helloWorldContract.owner()).to.equal(accounts[1].address); 
    // console.log( await helloWorldContract.owner())
  });

  //it("Should not allow anyone other than owner to change text", async function () {
  //  // TODO
  //  throw Error("Not implemented");
  //});

  //it("Should change text correctly", async function () {
  //  // TODO
  //  throw Error("Not implemented");
  //});
});
