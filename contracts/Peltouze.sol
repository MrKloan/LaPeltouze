pragma solidity ^0.4.8;

contract Peltouze {

    struct SupplyChain {
        uint id;
        address owner;
        string name;
        uint stepIncrement;
        mapping(uint => Step) steps;
    }

    struct Step {
        string product;
        string operation; 
    }

    uint private supplyChainsIncrement = 0;
    mapping(uint => SupplyChain) public supplyChains;

    function addSupplyChain(string name) public returns (uint) {
        uint id = supplyChainsIncrement;

        supplyChains[id] = SupplyChain(id, msg.sender, name, 0);
        supplyChainsIncrement = supplyChainsIncrement + 1;

        return id;
    }

    function addStep(uint supplyChainId, string product, string operation) public returns (uint) {
        SupplyChain storage supplyChain = supplyChains[supplyChainId];

        require(msg.sender == supplyChain.owner);

        uint stepId = supplyChain.stepIncrement;
        supplyChain.steps[stepId] = Step(product, operation);
        supplyChain.stepIncrement = stepId + 1;

        return stepId;
    }
    

}