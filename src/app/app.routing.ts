import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SupplyComponent} from './supply/supply.component';

export const routes: Routes = [
  { path: '', redirectTo: 'supply', pathMatch: 'full' },
  { path: 'supply', component: SupplyComponent},
  { path: '**', redirectTo: 'supply'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
