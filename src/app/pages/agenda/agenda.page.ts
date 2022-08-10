import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';

import { DatabaseService } from 'src/app/services/database.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

   // handlerMessage = '';
  // roleMessage = '';


  constructor(public database: DatabaseService,
             public usuarioservice: UsuarioService,
             private router: Router,
             public toastController: ToastController,
             public loadingController: LoadingController,
             public alertController: AlertController,
             public reservaService: ReservaService
    ) { }



//  async publicar() {
//    const alert = await this.alertController.create({
//     header: 'Atencion',
//     subHeader: 'Verfica bien los datos',
//     message: 'Vas a publicar una Reserva con el dia: '
//        + this.newReserva.dia  + ' en el horario de las '+ this.newReserva.horas + 'hs, en la  '+ this.newReserva.cancha,
//     buttons: [{
//       text: 'Cancel',
//       role: 'cancel',
//       handler: () => {
//         this.handlerMessage = 'Alert canceled';
//       },
//     },
//     {
//       text: 'OK',
//       role: 'confirm',
//       handler: () => {
//         this.handlerMessage = 'Alert confirmed';
//       },
//     },
//     ],

//   });

//   await alert.present();

//     const { role } = await alert.onDidDismiss();
//     this.roleMessage = `Dismissed with role: ${role}`;
//     if (role === 'confirm'){
//       this.crearReserva();
//       console.log(this.roleMessage);
//     };

// }

//   async presentToast(mensaje: string, tiempo: number){
//     const toast = await this.toastController.create({
//       message: mensaje,
//       duration: tiempo
//     });

//     toast.present();}

//     async showLoading() {
//       this.loading = await this.loadingController.create({
//         message: 'Guardando',
//         // duration: 3000
//       });

//       await this.loading.present();
//     }



  ngOnInit() {
  }

}
