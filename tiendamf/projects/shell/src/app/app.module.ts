import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from '@core-lib';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from '@shared-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({carrito: cartReducer}),//inicializamos el Store  de NGRX, carrito es nuestro slice y cartReducer contiene el estado inicial y las transformaciones
    StoreDevtoolsModule.instrument({ //configuramos el funcionamineto de la traza para el plugin del Navegador
      maxAge: 25, //tamaño de memoria de estados
      logOnly: isDevMode(),
      traceLimit: 75,
      trace: false,
      autoPause: true
    }),
    HeaderComponent//importamos el componente para poder usarlo dentro de este MF
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
