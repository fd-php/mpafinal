import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';


import { IonicModule } from '@ionic/angular';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { RatingComponent } from './rating/rating.component';




@NgModule({
  declarations: [
    HeaderComponent,
    AvatarSelectorComponent,
    RatingComponent,

  ],
  exports:[
    HeaderComponent,
    AvatarSelectorComponent,
    RatingComponent,

  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
