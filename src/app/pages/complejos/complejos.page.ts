import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';


import { Complejo, Like, Perfil } from 'src/app/interfaces/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Subscription } from 'rxjs';
import { ComplejoService } from '../../services/complejo.service';
import { NotificacionsService } from 'src/app/services/notificacions.service';

@Component({
  selector: 'app-complejos',
  templateUrl: './complejos.page.html',
  styleUrls: ['./complejos.page.scss'],
})
export class ComplejosPage implements OnInit, OnDestroy {

    complejos: Complejo[] = [];

    actComplejo: Complejo;
    complejoSubscriber: Subscription;

    rating = null;
    like= false;
    votoLikes: number = null;
    divisor = null;
    //cargandoGeo = false;
    private enlace = 'Complejos/';

  constructor(public database: DatabaseService,
    public usuarioservice: UsuarioService,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public complejoService: ComplejoService,
    ) {

      this.initComplejo();
      this.loadComplejo();


    }

    getComplejos(){

      this.database.getComplejos<Complejo>(this.enlace ).subscribe( res => {
        this.complejos = res;
          // console.log(res);
      });

    }

    loadComplejo(){
      this.complejoSubscriber = this.complejoService.getComplejo().subscribe( res=> {
        // console.log('load complejo desde load.ts', res);
        this.actComplejo = res;
        // this.loadPromedio();

      });

    }
      // getComplejo(){

      //   this.database.get<Complejo>(this.enlace,this.actComplejo.id ).subscribe( res => {

      //       this.actComplejo = res;
      //     // console.log('aca getComplejo()', res);
      //   });
      //   return;
      // }


        async giveLike(){
        const path = 'Complejos/'+this.actComplejo.id+'/likes';
        const uid =  await this.usuarioservice.getUserProfileId();

        const data: Like = {
          uid,
          user: null,
          fecha: new Date(),
          like: !this.like,
        } ;

         this.database.altaUsuario(data,path,uid);
         this.addLike(data.like);
       }

       async loadLikeUser()
       {
        const path = 'Complejos/'+this.actComplejo.id+'/likes';
       //const uid = '9rhODofHpGbOKmSls1LlTEPEcNp1';
        const uid =  await this.usuarioservice.getUserProfileId();
        this.database.get<Like>(path, uid).subscribe( res =>{
          if (res) {
             this.like = res.like;
             console.log(this.like);
             return;
          }
        });
       }

      //    loadPromedio()
      //  {
      //   const path = this.enlace+this.actComplejo.id+'/rates';
      //   this.database.getLength(path).subscribe( res =>{
      //     if (res) {
      //        this.votoLikes = 0;
      //        this.divisor = res.length;

      //        this.votoLikes = this.actComplejo.likes / this.divisor;
      //        console.log('Cantidad de votantes', this.votoLikes);

      //     }
      //   });

      //  }

        addLike(estado: boolean){
        const path = 'Complejos/';
        const  id = this.actComplejo.id;
        let numLikes = 0;
        if (this.actComplejo.likes) {
          numLikes = this.actComplejo.likes;
        }
        const data ={
        likes: estado ? numLikes + 1  : numLikes - 1
       };
       if (data.likes < 0){
        data.likes = 0;
       }
       this.database.updateDoc(data, path, id);
       }


      //  getGeo(){
      //  // console.log(this.actComplejo.ubicacion);
      //   this.cargandoGeo = true;

      //   this.geolocation.getCurrentPosition().then((resp) => {
      //     // resp.coords.latitude
      //     // resp.coords.longitude
      //     this.cargandoGeo = false;

      //     const coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
      //     console.log(coords);

      //    }).catch((error) => {
      //      console.log('Error getting location', error);
      //      this.cargandoGeo = false;
      //    });
      //  }


      //  let watch = this.geolocation.watchPosition();
      //  watch.subscribe((data) => {
      //   // data can be a set of coordinates, or an error (if an error occurred).
      //   // data.coords.latitude
      //   // data.coords.longitude
      //  });

    ngOnInit() {
     this.votoLikes = this.complejoService.loadPromedio();

    }

    ngOnDestroy(){
      console.log('ngOnDestroy() - complejo componente');
      if (this.complejoSubscriber) {
         this.complejoSubscriber.unsubscribe();
      }
    }

    initComplejo(){
      this.actComplejo = {
        idComplejo: '',
        id: 'rS9aHBuCp8Wu3Y67w9CQVrLMN8l1',
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
    }


}
