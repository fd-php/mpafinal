import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguroPageRoutingModule } from './seguro-routing.module';

import { SeguroPage } from './seguro.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguroPageRoutingModule,
    ComponentsModule,
    QRCodeModule

  ],
  declarations: [SeguroPage]
})
export class SeguroPageModule {}
