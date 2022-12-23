import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';


import { IonicModule } from '@ionic/angular';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { RatingComponent } from './rating/rating.component';
import { HoralibreComponent } from './horalibre/horalibre.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { FormsModule } from '@angular/forms';
import { EmptyScreenComponent } from './empty-screen/empty-screen/empty-screen.component';
import { ChatBoxComponent } from './chat-box/chat-box/chat-box.component';





@NgModule({
  declarations: [
    HeaderComponent,
    AvatarSelectorComponent,
    RatingComponent,
    HoralibreComponent,
    PublicacionesComponent,
    EmptyScreenComponent,
    ChatBoxComponent


  ],
  exports:[
    HeaderComponent,
    AvatarSelectorComponent,
    RatingComponent,
    HoralibreComponent,
    PublicacionesComponent,
    EmptyScreenComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
