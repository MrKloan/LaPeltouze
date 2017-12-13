import { Component, OnInit } from '@angular/core';
import {SupplyChain} from '../models/supply.chain';
import {Step} from '../models/step';

const Web3 = require('web3');
const contract = require('truffle-contract');
const peltouzeArtifact = require('../../../build/contracts/MetaCoin.json');

@Component({
  templateUrl: './supply.component.html'
})
export class SupplyComponent implements OnInit {

  // Contracts & Web3
  web3: any;
  peltouze: any = contract(peltouzeArtifact);
  account: any;
  accounts: any;

  chains: SupplyChain[] = [{
    uid: 1234,
    name: "Yolo"
  }];

  newChain: any = {};
  newStep: any = {};

  displayDialog: boolean;

  ngOnInit() {

    this.checkAndInstantiateWeb3();
    this.setupAccount();

    this.getAllSupplyChains();
  }

  checkAndInstantiateWeb3() {

    this.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    );
  }

  setupAccount() {

    this.peltouze.setProvider(this.web3.currentProvider);

    this.web3.eth.getAccounts((err, accounts) => {

      if (err != null) {
        alert('There was an error fetching your accounts.' + err);
        return;
      }

      if (accounts.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      this.accounts = accounts;
      this.account = this.accounts[0];
    });
  }

  getAllSupplyChains() {
    let meta;

    this.peltouze
      .deployed()
      .then(instance => {
        meta = instance;

        return meta.supplychains.call();
      })
      .then(supplyList => {
        this.chains = supplyList;
      })
      .catch(e => {
        console.log(e);
      });
  }

  addSupplyChain() {
    let meta;

    this.peltouze
      .deployed()
      .then(instance => {
        meta = instance;

        return meta.addSupplyChain.call(this.newChain.name, {
          from: this.account
        });
      })
      .then(newSupplyChainId => {
        this.getAllSupplyChains();
      })
      .catch(e => {
        console.log(e);
      });
  }

  /*getAllStepsForSupplyChain(supplyUid: number): Step[] {

  }*/

  addStepForSupplyChain(supplyChainId: number) {
    let meta;

    this.peltouze
      .deployed()
      .then(instance => {
        meta = instance;

        return meta.addStep.call(supplyChainId, this.newStep.product, this.newStep.operation, {
          from: this.account
        });
      })
      .then(newStepId => {
        this.getAllSupplyChains();
      })
      .catch(e => {
        console.log(e);
      });
  }

  showAddStepDialog() {
    this.displayDialog = true;
  }
}
