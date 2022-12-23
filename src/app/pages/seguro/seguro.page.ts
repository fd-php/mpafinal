import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Perfil } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-seguro',
  templateUrl: './seguro.page.html',
  styleUrls: ['./seguro.page.scss'],
})
export class SeguroPage implements OnInit, OnDestroy {

  qrCodeString = 'Martes 20/12/22, 19:00hs - Cancha 1. Juan Fernandez';

  scannedResult: any;

  contentVisibility = '';

  mensajeMovil= 'No es un dispositivo MOVIL';

  actPerfil: Perfil = {
    uid: '',
    email: '',
    name: '',
    telefono: '',
    avatar: '',
    rol: 1,
  };

  enlace = 'users/';
  acredita = false;

  constructor(
    public database: DatabaseService,
    public auth: AuthService,
    private platform: Platform,
    public toastController: ToastController,
    public alertController: AlertController


  ) { }

  async acreditar(){
    
    const alert = await this.alertController.create({
      backdropDismiss: false,
      cssClass: 'normal',
      header: 'Acreditacion Turno',
      message: ' <strong>TURNO VALIDADO</strong>',
      buttons: [
        {
  
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
            this.acredita= true;
            this.alertController.dismiss();
           }
        }
      ]
    });
    await alert.present();
  }
  async getPerfil(){
    const uid = await this.auth.getId();
    this.database.get<Perfil>(this.enlace, uid ).subscribe( res => {
    this.actPerfil = res;
    });

  }

  async checkPermission(){
    if (this.platform.is('capacitor')) {
    try{
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted){
        //Usuario da permisos
        return true;
      }
        return false;
    }catch(e){
      console.log(e);
    }
    }else{
      return console.log(this.mensajeMovil);
    }
  }
  async startScan(){
    try{

      const permission= await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();

      document.querySelector('body').classList.add('scanner-active');

      this.contentVisibility = 'hidden';

      const result = await BarcodeScanner.startScan();

      console.log(result);
      //mostrar el fondo
      BarcodeScanner.showBackground();
      //quitar el elemento
      document.querySelector('body').classList.remove('scanner-active');

      this.contentVisibility = '';

      if(result?.hasContent){

        this.scannedResult = result.content;

          console.log(this.scannedResult);
        }

      }catch(e){

        console.log(e);

        this.stopScan();
      }
    }

    stopScan(){
      if (this.platform.is('capacitor')) {
      //mostrar el fondo
      BarcodeScanner.showBackground();
      //detener escaner
      BarcodeScanner.stopScan();
      //quitar el elemento
      document.querySelector('body').classList.remove('scanner-active');

      this.contentVisibility = '';
    }
    }


    ngOnInit() {
      this.getPerfil();
    }

    ngOnDestroy(): void {

      this.stopScan();

    }

}
