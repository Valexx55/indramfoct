import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    SharedComponent,
    //HeaderComponent //vamos a definir este componente como standAlone ng 17
  ],
  imports: [
  ],
  exports: [
    SharedComponent
  ]
})
export class SharedModule { }
