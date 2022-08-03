import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ToastController, LoadingController } from '@ionic/angular';
import { Perfil, TipoRol } from 'src/app/interfaces/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DataService } from '../../services/data.service';
import { AngularFireModule } from '@angular/fire/compat';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
    // eslint-disable-next-line @typescript-eslint/member-ordering

    tipoRol: TipoRol[] = ['jugador','complejo'];

  newPerfil: Perfil = {
    id: '',
    usuario: '',
    nombre: '',
    telefono: '',
    avatar: '',
    rol: 1,
  };

  loading: any;

   constructor(public database: DatabaseService,
              public usuarioservice: UsuarioService,
              private router: Router,
              public toastController: ToastController,
              public loadingController: LoadingController
     ) { }

  async crearPerfil(){
    this.showLoading();
    const data = this.newPerfil;

    data.id = this.usuarioservice.getUserProfileId();

    data.usuario = this.usuarioservice.getUserProfileMail();

    const enlace = 'Perfiles';

    await this.database.altaUsuario<Perfil>(data,enlace,data.id);

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

    seleccionarRol(event: any){

      if (event.detail.value === 'jugador' ){
        this.newPerfil.rol = 1;
      }else {
        this.newPerfil.rol = 2;
      } ;

    }

  ngOnInit() {

  }


}
