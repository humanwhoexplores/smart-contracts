pragma solidity ^0.5.0;

import "https://github.com/mrdavey/ez-flashloan/blob/remix/contracts/aave/FlashLoanReceiverBase.sol";
import "https://github.com/mrdavey/ez-flashloan/blob/remix/contracts/aave/ILendingPool.sol";
import "https://github.com/mrdavey/ez-flashloan/blob/remix/contracts/aave/ILendingPoolAddressesProvider.sol";

contract IBalanceLogger {

  event HasBalanceOf(address _owner, uint _balance);

  function logBalance() public;

}

contract MyFlashloanContract is FlashLoanReceiverBase(address(0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728)) {

    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _params
    )
        external
    {
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance, was the flashLoan successful?");
        
        // transfer loan to tx.origin address
        IERC20(0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108).transfer(tx.origin, _amount);

        IBalanceLogger(0xEbc2B6aC8257571a5f7E03bFBe89715E938F43dd).logBalance();
    
        // transfer money back to contract to pay back. Fee have to be transferred to this contract before. 
        // Approval for contract address with tx.origin at MockDAI must be set for _amount
        IERC20(0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108).transferFrom(tx.origin, address(this), _amount);

        // Time to transfer the funds back
        uint totalDebt = _amount.add(_fee);
        transferFundsBackToPoolInternal(_reserve, totalDebt);
    }

    function flashloan(uint amount) public onlyOwner {
        bytes memory data = "";
        address asset = address(0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108); // ropsten DAI
        ILendingPool lendingPool = ILendingPool(addressesProvider.getLendingPool());
        lendingPool.flashLoan(address(this), asset, amount*(10**18), data);
    }
}