import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente, Perfil, Slides } from 'src/app/interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Observable<Componente[]>;
  slides: Observable<Slides[]>;

  actPerfil: Perfil = {
    id: '',
    usuario: '',
    nombre: '',
    telefono: '',
    avatar: '',
    rol: 1,
  };

  admin = false;

  private enlace = 'Perfiles/';


  constructor(private menuCtrl: MenuController,
              private dataService: DataService,
              private usuarioService: UsuarioService,
              private router: Router,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private database: DatabaseService,

          ) { }

  async logout(){
    await this.usuarioService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

 async getPerfil(){
    const uid = await this.usuarioService.getUserProfileId();
    this.database.get<Perfil>(this.enlace,uid ).subscribe( res => {

      if (res!==null){

            if(res.rol === 2){
              this.admin = true;
            }else{
              this.admin = false;
            }

        this.actPerfil = res;
      }else{
        this.admin = false;
      }

//    console.log(res);


    });
  }
  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
    this.slides = this.dataService.getSlides();
    this.getPerfil();

  }

    mostrarMenu(){

    this.menuCtrl.open('first');

    }




}
