const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

var mnemonic = "SCRAP DISH BROCCOLI UPDATE LOUNGE AFRAID ARREST KNOW RENEW LEADER SUNSET COPY";
var infura_provider_url = "https://rinkeby.infura.io/v3/7985ca9520d8459b9e3ef03d4ecbe81c";

const provider = new HDWalletProvider( mnemonic, infura_provider_url);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("All the accounts we got are ", accounts);
  console.log("Attempting to deploy from account", accounts[0]);

  let balance = await web3.eth.getBalance(accounts[0]);
  console.log("The balance is ", balance);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();
