import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { HoraLibre, Reserva } from 'src/app/interfaces/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {

  reservas: Reserva[] = [];
  //newHoraLibre: HoraLibre;
  private path = '/Reservas';

  constructor(
    public menucontroler: MenuController,
    public database: DatabaseService,
    public usuarioservice: UsuarioService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,) { }


  ngOnInit() {
    //this.nuevo();
    this.getHoras();
    this.getPedidosCulminados();
  }

  async getHoras() {
    

    this.database.getCollection<Reserva>(this.path).subscribe(  res => {

            //this.reservas = res;
          //  console.log('GetHoras',this.reservas[1].uid);
    });
  }

  async getPedidosCulminados() {
    console.log('getPedidosCulminados()');
    const cuid = await this.usuarioservice.getUserProfileId();
   this.database.getCollectionQuery<Reserva>(this.path, 'cuid', '==', cuid ).subscribe( res => {
          if (res.length) {
                console.log('getPedidosCulminados() -> res ', res);
                this.reservas = res;
          }
          else{
            console.log('nada', cuid);
          }
    });

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
vercliente(event: any){
  console.log(event);
}
}
