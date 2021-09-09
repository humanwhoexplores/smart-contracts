### How to become a millionaire for 15 seconds 
https://ice09.github.io/how-to-become-a-millionaire-for-15-seconds/

Q.) Are Flash Loans Secure ? 
Yes :  why not  : BEauty of Flash Loans : If BOTH LENDING & BORROWING ARE SUCCESSSFUL only then the 
Transactions would be OKAYED. 
ELSE :- the transactions will be revereted :  not approved . The remarkable beauty of Flash Loans.
Almost NO-RISK involved with Flash Loan

It is one of the side-effects of decentralized, transactional smart contract programming.


### Q.) How to mint DAI?
The doc says open AAVE TESTNET -> Connect Your MetaMask and Mint DAI.  But bro at the time of writing : the DAI Faucet on AAVE was not available. 
So i found 2 ways to get DAI on testnets.  

1.) If you want to get some free Test DAI on Ropsten Network -> Connect your wallet(on Rospten Network) to the following contract and hit MINT function
https://t.co/jTxbVtRMIA?amp=1

2.) Want to get some Test DAI 
use Aave's Faucet https://testnet.aave.com/faucet/DAI 
connect your wallet on Kovan TestNet and mint some DAI out of thin air

For this tutorial, I need to use ROPSTEN.


### Q.) HOW to check for WALLET BALANCE for DAI in ETHERSCAN
I am checking the smart contract, to get the Balance in the account  https://ropsten.etherscan.io/tx/0x997257288c8a9469501f7c1e725c590550125d48e94f9d10b92952854bf7d1fa#eventlog 
It runs but Inget Balnce as 0 

BECAUSE  :- 
-------
I got the Balance from another account :- i mean from anothet faucet. So it will give me 0 because this faucet has not givem my account any DAI.
contract BalanceLogger {
  address tracker_0x_address = 0xf80a32a835f79d7787e8a8ee5721d0feafd78108; // Ropsten DAI
  
  event HasBalanceOf(address _owner, uint _balance);

  function logBalance() public {
      uint balance = ERC20(tracker_0x_address).balanceOf(tx.origin);
      emit HasBalanceOf(tx.origin, balance);
  }

------


