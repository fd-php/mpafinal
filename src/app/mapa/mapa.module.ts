import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MapaComponent } from './mapa.component';



@NgModule({
  declarations: [MapaComponent],
  exports:[
    MapaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class MapaModule { }
