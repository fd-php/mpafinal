import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MicomplejoPageRoutingModule } from './micomplejo-routing.module';

import { MicomplejoPage } from './micomplejo.page';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MicomplejoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MicomplejoPage]
})
export class MicomplejoPageModule {}
