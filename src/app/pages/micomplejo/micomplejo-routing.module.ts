import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MicomplejoPage } from './micomplejo.page';

const routes: Routes = [
  {
    path: '',
    component: MicomplejoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MicomplejoPageRoutingModule {}
