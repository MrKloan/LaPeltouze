pragma solidity ^0.4.8;

contract Authorities {
    event InitiateChange(bytes32 indexed parentHash, address[] newSet);
    event ChangeFinalized(address[] currentSet);

    address[] public validators;
    address[] public staging;

    function Authorities() public {
        initiateChange();
    }

    function addValidator(address validator) public onlyValidator notStaged(validator) {
        staging.push(validator);
        initiateChange();
    }

    function removeValidator(address validator) public onlyValidator notSender(validator) {
        for (uint i = 0 ; i < staging.length ; ++i) {
            if (staging[i] == validator) {
                staging = removeStagedAddress(i);
                break;
            }
        }
    }

    function removeStagedAddress(uint index) private returns (address[]) {
        if (index >= staging.length) {
            return staging;
        }

        for (uint i = index ; i < staging.length - 1 ; ++i) {
            staging[i] = staging[i + 1];
        }

        delete staging[staging.length - 1];
        staging.length--;

        return staging;
    }

    function getValidators() public constant returns (address[]) {
        return validators;
    }

    function initiateChange() private onlyValidator {
		InitiateChange(block.blockhash(block.number - 1), staging);
    }

    function finalizeChange() public onlyValidator {
		validators = staging;
		ChangeFinalized(validators);
    }

    modifier onlyValidator() {
        for (uint i = 0 ; i < validators.length ; ++i) {
            if (validators[i] == msg.sender) {
                revert();
            }
        }

        _;
    }

    modifier notStaged(address addr) {
        for (uint i = 0 ; i < staging.length ; ++i) {
            if (staging[i] == addr) {
                revert();
            }
        }

        _;
    }

    modifier notSender(address addr) {
        if (msg.sender == addr) {
            revert();
        }
        _;
    }
}