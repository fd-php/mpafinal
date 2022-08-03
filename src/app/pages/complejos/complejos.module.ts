import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplejosPageRoutingModule } from './complejos-routing.module';

import { ComplejosPage } from './complejos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplejosPageRoutingModule,
    ComponentsModule,

  ],
  declarations: [ComplejosPage]
})
export class ComplejosPageModule {}
