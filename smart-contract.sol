// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract WorkRoll {

    struct Agreement {
        address client;
        address freelancer;
        uint amount;
        uint[] milestones;
    }

    Agreement public newAgreement;


    constructor(
        address _client,
        address _freelancer,
        uint _amount,
        uint[] memory _milestones
    ) {
        newAgreement.client = _client;
        newAgreement.freelancer = _freelancer;
        newAgreement.amount = _amount;


        for (uint i = 0; i < _milestones.length; i++) {
            newAgreement.milestones.push(_milestones[i]);
        }
    }

   

    function checkPay(uint _globalAmount, uint[] memory _globalSplit) public pure returns(bool) {
        uint splitPay = 0;

        for (uint i = 0; i < _globalSplit.length ; i++) 
        {
            splitPay = splitPay + _globalSplit[i];
        }

        if(_globalAmount == splitPay){
            return true;
        }
        else{
            return false;
        }
    }
}