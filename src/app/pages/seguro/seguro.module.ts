import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguroPageRoutingModule } from './seguro-routing.module';

import { SeguroPage } from './seguro.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguroPageRoutingModule,
    ComponentsModule

  ],
  declarations: [SeguroPage]
})
export class SeguroPageModule {}
