import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
//import { OneSignal, OSNotification, OSNotificationPayload } from '@awesome-cordova-plugins/onesignal/ngx';

// import {
//   ActionPerformed,
//   PushNotificationSchema,
//   PushNotifications,
//   Token,
// } from '@capacitor/push-notifications';

//import { LocalNotifications } from '@capacitor/local-notifications';
//import OneSignal from 'onesignal-cordova-plugin';



@Injectable({
  providedIn: 'root'
})
export class NotificacionsService {

  // mensajes: OSNotificationPayload[] = [
  //   // {
  //   //   title: 'Titulo de la push',
  //   //   body: 'Este es el body de la push',
  //   //   date: new Date()
  //   // }
  // ];

userId: string;
appId = 'cb62797a-4c3a-48ae-be31-8129e7231f28';
restKey = 'ZWMyMjdhNzctODkzYS00N2RkLTk0ZDctOGE1YTEwMmFhOTAy';
//pushListener = new EventEmitter<OSNotificationPayload>();

  constructor(
   // public platform: Platform,
    //private oneSignal: OneSignal,
    private storage: Storage 
    ) {

      // this.storage.create();
      // this.cargarMensajes();
    }

    // async getMensajes() {
    //   await this.cargarMensajes();
    //   return [...this.mensajes];
    // }

    // async configuracionInicial() {

    //   this.oneSignal.startInit(this.appId, '1055983304185');

    //   this.oneSignal.inFocusDisplaying( this.oneSignal.OSInFocusDisplayOption.Notification );

    //   this.oneSignal.handleNotificationReceived().subscribe( ( noti ) => {
    //   // do something when notification is received
    //   console.log('Notificación recibida', noti );
    //   this.notificacionRecibida( noti );
    //   });

    //   this.oneSignal.handleNotificationOpened().subscribe( async ( noti ) => {
    //     // do something when a notification is opened
    //     console.log('Notificación abierta', noti );
    //     await this.notificacionRecibida( noti.notification );
    //   });

    //   // Obtener ID del suscriptor
    //   this.oneSignal.getIds().then( info => {
    //     this.userId = info.userId || this.appId;
    //     console.log(this.userId);
    //   });

    //   this.oneSignal.endInit();

    // }

    // async getUserIdOneSignal() {
    //   console.log('Cargando userId');
    //   // Obtener ID del suscriptor
    //   const info = await this.oneSignal.getIds();
    //   this.userId = info.userId;
    //   return info.userId;
    // }

    // async notificacionRecibida( noti: OSNotification ) {

    //   await this.cargarMensajes();

    //   const payload = noti.payload;

    //   const existePush = this.mensajes.find( mensaje => mensaje.notificationID === payload.notificationID );

    //   if ( existePush ) {
    //     return;
    //   }

    //   this.mensajes.unshift( payload );
    //   this.pushListener.emit( payload );

    //   await this.guardarMensajes();

    // }

    // guardarMensajes() {
    //   this.storage.set('mensajes', this.mensajes );
    // }

    // async cargarMensajes() {

    //   this.mensajes =  await this.storage.get('mensajes') || [];

    //   return this.mensajes;

    // }

    // async borrarMensajes() {
    //   await this.storage.clear();
    //   this.mensajes = [];
    //   this.guardarMensajes();
    // }



// OneSignal Nuevo
//  oneSignalInit(): void {
//     // Uncomment to set OneSignal device logging to VERBOSE
//     // OneSignal.setLogLevel(6, 0);
//     if (this.platform.is('capacitor')) {
//       console.log('es un movil');
//     // NOTE: Update the setAppId value below with your OneSignal AppId.

//     OneSignal.setAppId(this.appId);

//     // OneSignal.setNotificationOpenedHandler(
//     //      function(jsonData) {
//     //      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
//     //      }
//     //     );
//     OneSignal.setNotificationOpenedHandler(
//          function(jsonData) {
//          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
//          }
//         );

//              // Prompts the user for notification permissions.
//     //    * Since this shows a generic native prompt,
//     //we recommend instead using an In-App Message to prompt
//     //for notification permission (See step 7) to better communicate
//     // to your users what notifications they will get.
//     OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
//         console.log("User accepted notifications: " + accepted);
//     });

//   }else{
//       console.log('No es un movil');
//        }
//   }




    //Esto es de Firebase

    // inicializar(){
    //   if (this.platform.is('capacitor')) {
    //     console.log('Initializing HomePage');

    //   PushNotifications.requestPermissions().then(result => {
    //     if (result.receive === 'granted') {

    //       PushNotifications.register();
    //       this.addListeners();
    //     } else {

    //       console.log('No se han otorgado los permisos');
    //     }
    //   });

    //   }else{
    //     console.log('No es un movil');
    //   }
    //   }
  //   addListeners(){

  //     LocalNotifications.schedule({
  //       notifications: [
  //         {
  //           title: 'Notificacion local',
  //           body: 'Este es el cuerpo de la NL',
  //           id: 1,
  //         }
  //       ]
  //     });


  //   // On success, we should be able to receive notifications
  //   PushNotifications.addListener('registration',
  //     (token: Token) => {
  //       alert('Push registration success, token: ' + token.value);
  //     }
  //   );

  //   // Some issue with our setup and push will not work
  //   PushNotifications.addListener('registrationError',
  //     (error: any) => {
  //       alert('Error on registration: ' + JSON.stringify(error));
  //     }
  //   );

  //   // Show us the notification payload if the app is open on our device
  //   PushNotifications.addListener('pushNotificationReceived',
  //     (notification: PushNotificationSchema) => {
  //       alert('Push received: ' + JSON.stringify(notification));
  //       LocalNotifications.schedule({
  //         notifications: [
  //           {
  //             title: 'notificacion local',
  //             body: notification.body,
  //             id: 1,
  //             extra: {
  //               data: notification.data
  //             }
  //           }
  //         ]
  //       });
  //     }
  //   );

  //   // Method called when tapping on a notification
  //   PushNotifications.addListener('pushNotificationActionPerformed',
  //     (notification: ActionPerformed) => {
  //       alert('Push action performed: ' + JSON.stringify(notification));

  //     }
  //   );
  // }

}

