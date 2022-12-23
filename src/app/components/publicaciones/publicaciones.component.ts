import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController, PopoverController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { HoraLibre, Perfil, Reserva } from 'src/app/interfaces/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MapaComponent } from 'src/app/mapa/mapa.component';
import { EstadoAlquiler } from '../../interfaces/interfaces';

enum COLORS {
  GREY = '#E0E0E0',
  GREEN = '#76FF03',
  YELLOW= '#FFCA28',
  RED = 'DD2C00',
}

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {

  reservas = [];

  loading: any;

  actPerfil: Perfil = {
    uid: '',
    email: '',
    name: '',
    telefono: '',
    avatar: '',
    rol: null,
  };
  //newHoraLibre: HoraLibre;admin =false;

  estadoAlquiler = '';
  admin= null;

  private enlaceP = 'users/';
  private path = '/Reservas';

  constructor(
    public menucontroler: MenuController,
    public popoverController: PopoverController,
    public database: DatabaseService,
    public usuarioservice: UsuarioService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,) { }


  ngOnInit() {
    this.getPerfil();

  }

  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: MapaComponent,
      event: e,
    });

    await popover.present();

    const { role } = await popover.onDidDismiss();
    //this.roleMsg = `Popover dismissed with role: ${role}`;
  }

  async getPerfil(){
    const uid = await this.usuarioservice.getUserProfileId();
    this.database.get<Perfil>(this.enlaceP, uid ).subscribe( res => {

      if (res!==null){
        this.actPerfil = res;

            if(res.rol === 2){
              this.admin = this.actPerfil.rol;
              console.log('reservas x complejo', this.admin);
              this.getReservasPorComplejo();

            }else{
              this.admin = this.actPerfil.rol;
              console.log('else',this.admin);
              this.getHoras();
            }

      }

    });

  }


  async getHoras() {
  let test = [];
    this.database.getCollection<Reserva>(this.path).subscribe(  res => {

            res.forEach( function (value: Reserva){
              if(value.uid === null){
                console.log('Value Foreach', value);
                test.push(value);
              }
            } );

    });
    this.reservas = test;
    console.log('nuevo arreglo',this.reservas);
  }

  async getReservasPorComplejo() {
  //  console.log('getPedidosCulminados()');
  let test = [];
    const cuid = await this.usuarioservice.getUserProfileId();
   this.database.getCollectionQuery<Reserva>(this.path, 'cuid', '==', cuid ).subscribe( res => {
          if (res.length) {
          //  res.forEach( function (value: Reserva){
          //      if(value.uid !== null){
          //        test.push(value);
          //        console.log('test foreacg',test);

          //      }
          //    } );

          this.reservas = res;

          }
          else{
            console.log('nada', cuid);
          }
    });
    // this.reservas = test;
  }
  // nuevo() {
  //   //this.enableNewHoraLibre = true;
  //   this.newHoraLibre = {
  //     hlid: this.database.createId(),
  //     dia: '',
  //     horas: '',
  //     cancha: '',
  //     estadoP: 'Publicar',
  //     fechaCreacion: new Date(),

  //   };
  // }

  verUbicacion(event) {
    console.log('Ubicacion', event.detail.value);

  }

  async verCancha(event) {
    console.log('Cancha', event);

    const alert = await this.alertController.create({
      backdropDismiss: false,
      cssClass: 'normal',
      header: event,
      message: ' Disposicion:<strong>Cubierta</strong>, Estructura: <strong>Blindex </strong>, Superficie: <strong>Sintetico</strong>',
      buttons: [
        {

          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
           }
        }
      ]
    });
    await alert.present();
    }



async alquilar(reserva: Reserva) {

  const cuid = await this.usuarioservice.getUserProfileId();

  const path = this.path+ '/' + reserva.rid;
  const alert = await this.alertController.create({
    backdropDismiss: false,
  cssClass: 'normal',
  header: 'Advertencia',
  message: ' Seguro desea <strong>ALQUILAR</strong> esta Hora Libre ?',
  buttons: [
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'normal',
      handler: (blah) => {
        console.log('Confirm Cancel: blah', path);
        // this.alertController.dismiss();
      }
    }, {
      text: 'Ok',
      handler: () => {
        console.log('Confirm Okay', reserva.rid, 'usuario', this.actPerfil);
        const data ={
          estadoAlquiler: 'Alquilado',
          fechaPick: new Date(),
          uid: this.actPerfil
         };
         console.log(data);
         //this.showLoading();
        //UPDATE REGISTRO
         this.database.updateDoc(data, this.path, reserva.rid).then( res => {

             this.presentToast('Eliminado con exito', 2000);
           this.alertController.dismiss();
         }).catch( error => {
             this.presentToast('No se pude eliminar', 2000);
         });
      }
    }
  ]
});
await alert.present();
}

async sendPush() {
  console.log('sendPush');

  const alert = await this.alertController.create({
    backdropDismiss: false,
    cssClass: 'normal',
    header: 'Push Notification',
    message: ' <strong>Enviar Notificacion</strong>',
    buttons: [
      {

        text: 'Enviar',
        handler: () => {
          console.log('Confirm Okay');
          this.presentToast('Notificacion Enviada', 2000);
          this.alertController.dismiss();
         }
      }
    ]
  });
  await alert.present();
  }

async showLoading() {
  this.loading = await this.loadingController.create({
    cssClass: 'normal',
    message: 'Guardando...',
  });
  await this.loading.present();
}

async presentToast(mensaje: string, tiempo: number){
  const toast = await this.toastController.create({
    message: mensaje,
    duration: tiempo
  });

  toast.present();
}

getColor(estado: string) {

  // if (this.isAboveRating(index)) {
  //  return COLORS.GREY;
  // }
  switch (this.estadoAlquiler){
   case 'Alquilado':
    return console.log('Alquilado');
      //return COLORS.RED;
   case 'Libre':
    return console.log('Libre');
     //return COLORS.YELLOW;
   case 'Pagado':
    return console.log('Pagado');
     //return COLORS.GREEN;
   default:
     return COLORS.GREY;

  }

 }
}
