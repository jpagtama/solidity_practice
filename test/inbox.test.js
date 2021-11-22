const assert = require('assert');
const ganache = require('ganache-cli');
//notice Web3 is capitalized bc it's a constructor
//we refer to the instance as 'web3' (lowercase)
const Web3 = require('web3'); 
//pass in a provider to the web3 instance
const web3 = new Web3(ganache.provider());
//in order for web3 to communicate with a network it needs a provider
//the provider is like a phone that communicates between web3 and ganache

let accounts;

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //use one of those accounts to deploy the contract

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log("accounts",accounts);
    });
});