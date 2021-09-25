// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile')

let accounts;
let inbox;
const INITIAL_MESSAGE =  'Inbox contract';

beforeEach(async () => {
    // beforeEach runs before running each test
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data : bytecode, arguments: ['Inbox contract']})
        .send({from: accounts[0], gas: '1000000'})

    console.log("the account from which i am deploying is " , accounts[0]);
    let balance = await web3.eth.getBalance(accounts[0]);
    console.log("The balance is ", balance);   
});

describe('Inbox' , () => {
    it('deploys a contract', () => {
        console.log("All the accounts we got from Test Script are ", accounts);
    });

    // it('checking if we have valid address of a contract', () => {
    //     // if the contract has been deployed, it will have an address, this test checks that
    //     assert.ok(inbox.options.address);
    //     console.log("The address of the contract is " , inbox.options.address);
    // });

    // it('has a default message', async ()=> {
    //     const message = await inbox.methods.message().call();
    //     assert.equal(message, INITIAL_MESSAGE);
    // });
});