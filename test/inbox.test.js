const assert = require('assert');
const ganache = require('ganache-cli');
//notice Web3 is capitalized bc it's a constructor
//we refer to the instance as 'web3' (lowercase)
const Web3 = require('web3'); 
//pass in a provider to the web3 instance
const web3 = new Web3(ganache.provider());
//in order for web3 to communicate with a network it needs a provider
//the provider is like a phone that communicates between web3 and ganache
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hi there!']
        })
        .send({ 
            from: accounts[0],
            gas: '1000000'
        });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log('Inbox contract:', inbox);
        //assert.ok just asks does the value exist
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye');
    });
});