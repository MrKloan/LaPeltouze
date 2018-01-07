import {Step} from './step';

export interface SupplyChain {
  uid?: number;
  name: string;
  steps?: Step[];
}
