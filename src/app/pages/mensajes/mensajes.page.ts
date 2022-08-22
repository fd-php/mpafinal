import { ApplicationRef, Component, OnInit } from '@angular/core';
// import { NotificacionsService } from 'src/app/services/notificacions.service';
// import { OSNotificationPayload } from '@awesome-cordova-plugins/onesignal/ngx';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  // mensajes: OSNotificationPayload[] = [];
  // userId = '';

  constructor( 
              // public notifications: NotificacionsService,
              //  private applicationRef: ApplicationRef 
               ) {}

  ngOnInit() {

    // this.notifications.pushListener.subscribe( noti => {
    //   this.mensajes.unshift( noti );
    //   this.applicationRef.tick();
    // });
  }

  // async ionViewWillEnter() {

  //   console.log('Will Enter - Cargar mensajes');
  //   this.userId = await this.notifications.getUserIdOneSignal();

  //   this.mensajes = await this.notifications.getMensajes();

  // }

  // async borrarMensajes() {
  //   await this.notifications.borrarMensajes();
  //   this.mensajes = [];

  //   console.log(this.mensajes);
  // }
}
