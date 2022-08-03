import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('slidePrincipal') slides: IonSlides;

  avatarSlide = {
    slidesPerView: 3.5
  };


  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private router: Router,
    //private database: DatabaseService
    ){ }
    // easy acces for form fields
    get email(){
      return this.credentials.get('email');
    }
    get password(){
      return this.credentials.get('password');
    }

  ngOnInit() {
    //
    this.credentials = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]
      });
  }
  async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.usuarioService.register(this.credentials.value);
    await loading.dismiss();

    if (user){
      this.router.navigateByUrl('/registro', {replaceUrl: true});
     // console.log(this.usuarioService.getUserProfile());

      } else{
        this.showAlert('El registro ha fallado','Por Favor intente de nuevo');
      }
    }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.usuarioService.login(this.credentials.value);
    await loading.dismiss();

    if (user){
      this.router.navigateByUrl('/inicio', {replaceUrl: true});
     // console.log(this.usuarioService.getUserProfile());
    } else{
        this.showAlert('El Inicio de Sesion ha fallado','Por Favor intente de nuevo');
      }
    }


  async showAlert(header, message)  {
  const alert = await this.alertController.create({
    header,
    message,
    buttons: ['OK'],
  });
  await alert.present();
  }

  // seleccionarAvatar( avatar ){
  //   this.avatars.forEach(av => av.seleccionado = false);
  //   avatar.seleccionado = true;

  // };
  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  };

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  };

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}


