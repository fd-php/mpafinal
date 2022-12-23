import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/interfaces/interfaces';
import { DatabaseService } from '../../services/database.service';
import { UsuarioService } from '../../services/usuario.service';
import { StorageService } from '../../services/storage.service';
import {Camera,CameraResultType,CameraSource} from '@capacitor/camera';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  actPerfil: Perfil = {
    uid: '',
    email: '',
    name: '',
    telefono: '',
    avatar: '',
    rol: 1,
  };
  newFile: any = [];

  profile = null;

  private enlace = 'users/';


  constructor(public database: DatabaseService,
    public usuarioservice: UsuarioService,
    public storageservice: StorageService,
    // public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
) {
  this.storageservice.getUserProfile().subscribe((data)=> {
    this.profile = data;

  });
 }

    async getPerfil(){
      const uid = await this.usuarioservice.getUserProfileId();
      this.database.get<Perfil>(this.enlace, uid ).subscribe( res => {
      this.actPerfil = res;
      });
  }

  //evento para cambiar certificado
  async newCert(){
    const file = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,//pedir camara o seleccionar
    });
    console.log(file);
    if (file) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.storageservice.uploadFile(file);
      loading.dismiss();
        if (!result){
          const alert = await this.alertController.create({
            header: 'Falla en la Carga',
            message: 'Hubo un problema en la carga del archivo',
            buttons: ['OK'],
          });
          await alert.present();
        }//segundo if
    } // primer if
  };



  ngOnInit() {
    this.getPerfil();
  }

}
