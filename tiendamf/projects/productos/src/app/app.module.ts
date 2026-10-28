import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { cartReducer } from '@core-lib';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({carrito: cartReducer})//iniciamos el Store en el MICRO Producto para que esté disponible independientemente
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
