pragma solidity ^0.4.8;

contract Producers {

    struct Producer {
        address addr;
        string name;
        bool active;
    }
    
    enum ProductState {TANK, BOTTLE}

    struct Product {
        ProductState state;
        string name;
        bool sent;
    }

    mapping (address => Producer) public producers;
    mapping (address => Product) public products;
}