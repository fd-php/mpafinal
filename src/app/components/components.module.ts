import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';


import { IonicModule } from '@ionic/angular';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { RatingComponent } from './rating/rating.component';
import { HoralibreComponent } from './horalibre/horalibre.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    HeaderComponent,
    AvatarSelectorComponent,
    RatingComponent,
    HoralibreComponent,
    PublicacionesComponent,


  ],
  exports:[
    HeaderComponent,
    AvatarSelectorComponent,
    RatingComponent,
    HoralibreComponent,
    PublicacionesComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
