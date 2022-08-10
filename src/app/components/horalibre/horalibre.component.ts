import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Console } from 'console';

import { Canchas, HoraLibre, TurnoM, TurnoN, Turnos, TurnoT, EstadoPublicacion } from 'src/app/interfaces/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-horalibre',
  templateUrl: './horalibre.component.html',
  styleUrls: ['./horalibre.component.scss'],
})
export class HoralibreComponent implements OnInit, OnDestroy {


  horaLibre: HoraLibre[] = [];

  newHoraLibre: HoraLibre;

  enableNewHoraLibre = true;

  turnos: Turnos[] = ['Mañana' , 'Tarde' , 'Noche'];
  turnoM: TurnoM[] = ['08' , '09' , '10' , '11' , '12' , '13'];
  turnoT: TurnoT[] = ['14' , '15' , '16' , '17' , '18'];
  turnoN: TurnoN[] = ['19' , '20' , '21' , '22' , '23'];
  canchas: Canchas[] = ['Cancha 1' , 'Cancha 2' , 'Cancha 3' , 'Cancha 4'];
  //estadoP: EstadoPublicacion[] = ['Publicar', 'Publicado'];
  turnoX: any;
  loading: any;

  dia: string;
  cancha: string;
  horas: any;
  today: string;

  handlerMessage = '';
  roleMessage = '';

  nuevosSuscriber: Subscription;

 private segmentoSeleccionado: string;
 private path = 'Complejos/';
 private enlace = '/Reservas';


  constructor(public menucontroler: MenuController,
              private router: Router,
              public database: DatabaseService,
              public usuarioservice: UsuarioService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public reservaService: ReservaService
             ) { }

  ngOnInit() {
      this.getHoras();
      this.today = new Date().toISOString();
      this.nuevo();
  }

  ngOnDestroy(){
  if (this.nuevosSuscriber) {
    this.nuevosSuscriber.unsubscribe();
  }
  }
  openMenu() {
      console.log('open menu');
      this.menucontroler.toggle('principal');
  }

  async getHoras() {
    const cuid = await this.usuarioservice.getUserProfileId();
    const path = this.path+ cuid +'/horaslibres';
    this.nuevosSuscriber =  this.database.getCollection<HoraLibre>(path).subscribe(  res => {
            this.horaLibre = res;
           console.log('GetHoras',this.horaLibre);
    });
  }

  async cargar() {
    const alert = await this.alertController.create({
     header: 'Atencion',
     subHeader: 'Verifique bien los datos',
     message: 'Ud. va a <strong> CREAR </strong> una Reserva con el dia: '
        + this.newHoraLibre.dia  + ' en el horario de las '+ this.newHoraLibre.horas + 'hs, en la  '+ this.newHoraLibre.cancha,
     buttons: [{
       text: 'Cancel',
       role: 'cancel',
       handler: () => {
         this.handlerMessage = 'Alert canceled';
       },
     },
     {
       text: 'OK',
       role: 'confirm',
       handler: () => {
         this.handlerMessage = 'Alert confirmed';
       },
     },
     ],

   });

   await alert.present();

     const { role } = await alert.onDidDismiss();
     this.roleMessage = `Dismissed with role: ${role}`;
     if (role === 'confirm'){
       this.guardarHoraLibre();
       console.log(this.roleMessage);
     };

 }

  async guardarHoraLibre() {
    this.showLoading();
      const data = this.newHoraLibre;

      const cuid = await this.usuarioservice.getUserProfileId();

      console.log (data);

      const path = this.path+ cuid +'/horaslibres';
      this.database.altaUsuario (data , path, data.hlid).then( res => {

           this.loading.dismiss();
           this.presentToast('guardo con exito', 2000);
      }).catch( error => {
         this.presentToast('no se pude guardar', 2000);
      });
  }




  async publicarHoraLibre(hora: HoraLibre){

    // console.log(hora);

    const cuid = await this.usuarioservice.getUserProfileId();
    const path = this.path+ cuid +'/horaslibres';

    const data ={
    estadoP: 'Publicado'

   };
   await this.database.updateDoc(data, path, hora.hlid);

   const alert = await this.alertController.create({
    cssClass: 'normal',
    header: 'Advertencia',
    message: ' Seguro desea <strong>PUBLICAR</strong> esta Hora Libre ?',
    buttons: [
      {
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
          // this.alertController.dismiss();
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Okay');

    const reserva = {
      rid: hora.hlid,
      cuid: cuid,
      alquiler: hora,
      estadoAlquiler: 'Libre',
      uid: null,
      fechaPick: '',

  };

  this.database.altaUsuario (reserva , this.enlace, reserva.rid).then( res => {
    console.log('ver reserva',reserva);

            this.presentToast('Publicado con exito', 2000);
            this.router.navigateByUrl('/agenda', {replaceUrl: true});
            this.alertController.dismiss();
          }).catch( error => {
              this.presentToast('No se pude Publicar', 2000);
          });
        }
      }
    ]
  });
  await alert.present();


  }

  async deleteHoraLibre(horaLibre: HoraLibre) {
        this.showLoading();
        const cuid = await this.usuarioservice.getUserProfileId();

        //console.log (horaLibre);

        const path = this.path+ cuid +'/horaslibres';
        const alert = await this.alertController.create({
        cssClass: 'normal',
        header: 'Advertencia',
        message: ' Seguro desea <strong>ELIMINAR</strong> esta Hora Libre ?',
        buttons: [
          {
            text: 'cancelar',
            role: 'cancel',
            cssClass: 'normal',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
              // this.alertController.dismiss();
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Okay');

              //DELETE REGISTRO
              this.database.deleteDoc(path, horaLibre.hlid).then( res => {

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

  nuevo() {
    this.enableNewHoraLibre = true;
    this.newHoraLibre = {
      hlid: this.database.createId(),
      dia: '',
      horas: '',
      cancha: '',
      estadoP: 'Publicar',
      fechaCreacion: new Date(),

    };
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

  seleccionarTurno(event: any){

          if (event.detail.value === 'Mañana' ){
           this.turnoX = this.turnoM;
          }
            else if(event.detail.value === 'Tarde' ) {
              this.turnoX = this.turnoT;
            }
              else{
                this.turnoX = this.turnoN;
              };

        }
        seleccionarDia(event: any){
          this.newHoraLibre.dia = event.detail.value;
          console.log('dia', this.newHoraLibre.dia);
        }

        seleccionarCancha(event: any){
          this.newHoraLibre.cancha = event.detail.value;
          console.log('Cancha', this.newHoraLibre.cancha);
        }

        seleccionarHora(event: any){
          this.newHoraLibre.horas = event.detail.value;
          console.log('Horas', this.newHoraLibre.horas);
        }

        cambiarSegmento(event: any){
          this.segmentoSeleccionado = event.target.value;
        }


}
