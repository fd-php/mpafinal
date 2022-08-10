import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, Observable } from 'rxjs';

import { Perfil, Reserva } from '../interfaces/interfaces';
import { DatabaseService } from './database.service';
import { UsuarioService } from './usuario.service';
import { authState, Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  reserva$ = new Subject <Reserva>();

  usuario: Perfil;
  path = 'Complejos/';
  uid = '' ;
  reservaSubscriber: Subscription;


  private reserva: Reserva;

  constructor(public usuarioService: UsuarioService,
              public database: DatabaseService,
              public router: Router,
              public auth: Auth,){

                //this.initReserva();

                this.stateUser();


               }
    stateUser() {

    authState(this.auth).subscribe((res)=>{
    console.log('Constructor ReservaService',res);
        if (res !== null) {
          this.uid = res.uid;
          this.getInfoUser();
          this.loadReserva();
        }
    });
    };

  loadReserva(){
    const path = 'Complejos/' + this.uid + '/' + 'horasLibres';

    console.log(path);
    if (this.reservaSubscriber){
      this.reservaSubscriber.unsubscribe();
    }
    this.reservaSubscriber = this.database.getCollection<Reserva>(path).subscribe(res=>{
      console.log('Loadreserva desde Service', res);
        // if (res) {
        //   this.reserva = res;
        //   this.reserva$.next(this.reserva);


        // }else{
        //   console.log('Else desde Service', res);
        //   this.initReserva();
        // }
    });
  }
  async getUid() {
    const user = await this.auth.currentUser;
    if (user === null) {
      return null;
    } else {
       return user.uid;
    }
 }



 async getInfoUser() {
     const uid = await this.getUid();
     const path = 'Perfiles';  
     this.database.get<Perfil>(path, uid).subscribe( res => {
           if (res !== undefined) {
                 this.usuario = res;
                  console.log('datosUsuario ->' , this.usuario);
           }
     });
  }

  initReserva(){
    this.reserva = {
    rid: '',
    cuid: this.uid,
    alquiler: [],
    estadoAlquiler: 'Libre',
    uid: this.usuario,
    fechaPick: '',

      };
      this.reserva$.next(this.reserva);
  }
  getreserva(): Observable<Reserva>{
    setTimeout(()=>{
      this.reserva$.next(this.reserva);
    }, 100);
    return this.reserva$.asObservable();
  }

}
