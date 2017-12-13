import { Component, OnInit } from '@angular/core';
import {SupplyChain} from '../models/supply.chain';

@Component({
  templateUrl: './supply.component.html'
})
export class SupplyComponent implements OnInit {

  chains: SupplyChain[] = [{
    uid: 1234,
    name: "Yolo"
  }];

  newChain: any = {};
  newStep: any = {};

  displayDialog: boolean;

  ngOnInit() {

    this.getAllSupplyChains();
  }

  getAllSupplyChains() {

  }

  addSupplyChain() {

  }

  getAllStepsForSupplyChain() {

  }

  addStepForSupplyChain() {

  }

  showAddStepDialog() {
    this.displayDialog = true;
  }
}
