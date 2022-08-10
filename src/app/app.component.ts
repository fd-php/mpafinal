import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from './services/data.service';
import { DatabaseService } from './services/database.service';
import { NotificacionsService } from './services/notificacions.service';
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
    private dataService: DataService,
    private usuarioService: UsuarioService,
    private database: DatabaseService,
    private notificationsService: NotificacionsService,

  ) {}



    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit() {

      //  this.componentes = this.dataService.getMenuShortOpts();
    }



}
