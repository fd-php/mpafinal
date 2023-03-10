import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

import { DataService } from './services/data.service';
import { DatabaseService } from './services/database.service';
import { PushService } from './services/push.service';
import { UsuarioService } from './services/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
   // componentes: Observable<Componente[]>;

  //componentes: Componente[] = [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private platform: Platform,
    private dataService: DataService,
    private usuarioService: UsuarioService,
    private database: DatabaseService,
    private push: PushService

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

       this.push.initPush();
    });
  }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit() {

      //  this.componentes = this.dataService.getMenuShortOpts();
    }



}
