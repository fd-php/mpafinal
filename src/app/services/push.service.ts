import { Injectable } from '@angular/core';
//import { Capacitor } from '@capacitor/core';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import  { LocalNotifications } from '@capacitor/local-notifications';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  constructor(
    private platform: Platform,
    private router: Router
  ) { }

//  initPush(){
//   if (this.platform.is('capacitor')){
//   console.log('Initializing HomePage');

//     // Request permission to use push notifications
//     // iOS will prompt user and return if they granted permission or not
//     // Android will just grant without prompting
//     PushNotifications.requestPermissions().then(result => {
//       if (result.receive === 'granted') {
//         // Register with Apple / Google to receive push via APNS/FCM
//         PushNotifications.register();
//       } else {
//          console.log('error');
//       }
//     });

//    // On success, we should be able to receive notifications
//     PushNotifications.addListener('registration',
//       (token: Token) => {
//         alert('Push registration success, token: ' + token.value);
//       }
//     );

//    // Some issue with our setup and push will not work
//     PushNotifications.addListener('registrationError',
//       (error: any) => {
//         alert('Error on registration: ' + JSON.stringify(error));
//       }
//     );

//     // Show us the notification payload if the app is open on our device
//     PushNotifications.addListener('pushNotificationReceived',
//       (notification: PushNotificationSchema) => {
//         alert('Push received: ' + JSON.stringify(notification));
//       }
//     );

//     // Method called when tapping on a notification
//     PushNotifications.addListener('pushNotificationActionPerformed',
//       (notification: ActionPerformed) => {
//         alert('Push action performed: ' + JSON.stringify(notification));
//       }
//       );
//     }
//   }

initPush(){
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
          title: 'Las Lajas Padel',
          body: 'Tenemos Cancha Libre el Martes 20 a las 19:00hs!! ',
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

  //Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      alert('Push received: ' + JSON.stringify(notification));
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Las Lajas Padel',
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
      this.router.navigate( [ '/agenda' ] );

    }
  );
}

}
