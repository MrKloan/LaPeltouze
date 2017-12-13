import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StepsComponent} from './steps/steps.component';
import {ProductsComponent} from './products/products.component';
import {SupplyComponent} from './supply/supply.component';

export const routes: Routes = [
  { path: '', redirectTo: 'steps', pathMatch: 'full' },
  { path: 'steps', component: StepsComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'supply', component: SupplyComponent},
  { path: '**', redirectTo: 'steps'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
