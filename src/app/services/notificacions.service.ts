import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

import { LocalNotifications } from '@capacitor/local-notifications';




@Injectable({
  providedIn: 'root'
})
export class NotificacionsService {

  constructor(public platform: Platform,
    ) {
    this.inicializar();
  }

  inicializar(){
    if (this.platform.is('capacitor')) {
      console.log('Initializing HomePage');

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {

        PushNotifications.register();
        this.addListeners();
      } else {

        console.log('No se han otorgado los permisos');
      }
    });


    }else{
      console.log('No es un movil');
    }
    }

    addListeners(){

      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Notificacion local',
            body: 'Este es el cuerpo de la NL',
            id: 1,
          }
        ]
      });


    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
        LocalNotifications.schedule({
          notifications: [
            {
              title: 'notificacion local',
              body: notification.body,
              id: 1,
              extra: {
                data: notification.data
              }
            }
          ]
        });
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));

      }
    );
  }

}

