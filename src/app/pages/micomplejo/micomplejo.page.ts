import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ToastController, LoadingController } from '@ionic/angular';
import { Perfil, Complejo } from 'src/app/interfaces/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-micomplejo',
  templateUrl: './micomplejo.page.html',
  styleUrls: ['./micomplejo.page.scss'],
})
export class MicomplejoPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  actPerfil: Perfil = {
    uid: '',
    email: '',
    name: '',
    telefono: '',
    avatar: '',
    rol: null,
  };

  complejo: Complejo = {
  idComplejo: '',
  id:'' ,
  usuario: '',
  nombre: '',
  ubicacion: '',
  direccion: '',
  telefono: '',
  fb: '',
  ig: '',
  canchas: '',
  servicios: '',
  // likes: null
  };

  actComplejo: Complejo = {
    idComplejo: '',
    id: '',
    usuario: '',
    nombre: '',
    ubicacion: '',
    direccion: '',
    telefono: '',
    fb: '',
    ig: '',
    canchas: '',
    servicios: '',
    likes:null
    };
  complejoExist = false;
  admin =false;
  loading: any;

  private enlace = 'Complejos/';
  private enlaceP = 'users/';

  constructor(public database: DatabaseService,
    public usuarioservice: UsuarioService,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController) { }

   async getPerfil(){
      const uid = await this.usuarioservice.getUserProfileId();
      this.database.get<Perfil>(this.enlaceP, uid ).subscribe( res => {

        if (res!==null){
          this.actPerfil = res;

              if(res.rol === 2){
                this.admin = true;
              }else{
                this.admin = false;
              }

        }else{
          this.admin = false;
        }

      });
    }

    async getComplejo(){
      const uid = await this.usuarioservice.getUserProfileId()
      this.database.get<Complejo>(this.enlace, uid ).subscribe( res => {
        if (res!==null){
          this.actComplejo = res;
              if(res.idComplejo!= null){
                this.complejoExist = true;
              }else{
                this.complejoExist = false;
                console.log(this.complejoExist);
              }
        }else{
          this.admin = false;
          console.log('segundo if',this.complejoExist);
        }

      });
  }

    async crearComplejo(){
      this.showLoading();

      const data = this.complejo;
      data.idComplejo = this.database.createId();

      data.id = await this.usuarioservice.getUserProfileId();

      data.usuario = this.usuarioservice.getUserProfileMail();

      const enlace = 'Complejos';

      await this.database.altaComplejo<Complejo>(data,enlace,data.id);

      await  this.presentToast('Registro Exitoso',2000);

      this.router.navigateByUrl('/inicio', {replaceUrl: true});

      this.loading.dismiss();
      //console.log(this.usuarioservice.getUserProfile());
    }

    async presentToast(mensaje: string, tiempo: number){
      const toast = await this.toastController.create({
        message: mensaje,
        duration: tiempo
      });

      toast.present();}

      async showLoading() {
        this.loading = await this.loadingController.create({
          message: 'Guardando',
          // duration: 3000
        });

        await this.loading.present();
      }

  ngOnInit() {
    this.getComplejo();
    this. getPerfil();
  }

  // message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';



  cancel() {
    this.modal.dismiss(null, 'cancel');
    console.log('CANCELADO');
  }

  confirm() {

    this.modal.dismiss(this.actComplejo);
    console.log(this.actComplejo.idComplejo);

  }

  onWillDismiss(event: any) {
   const  data = event.detail.data;
   const  enlace = 'Complejos/';
   const  idComplejo = this.actComplejo.id;
  this.database.updateDoc(data,enlace,idComplejo);
      console.log(event);

    }
}
