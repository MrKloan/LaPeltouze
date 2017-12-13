import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StepsComponent} from './steps/steps.component';
import {AppRoutingModule} from './app.routing';
import {ProductsComponent} from './products/products.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    StepsComponent,
    ProductsComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
