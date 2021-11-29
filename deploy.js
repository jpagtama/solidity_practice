const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const variables = require('./variables/variables');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    variables.phrase,
    'https://rinkeby.infura.io/v3/9edfee7611a547718c1b5e5272bd2d87'
);

const web3 = new Web3(provider);