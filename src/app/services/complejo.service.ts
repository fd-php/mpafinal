import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Complejo } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ComplejoService {

  complejo$ = new Subject <Complejo>();

  path = 'Complejos/';
  uid = 'rS9aHBuCp8Wu3Y67w9CQVrLMN8l1';
  complejoSubscriber: Subscription;


  private complejo: Complejo;
  private promedio: number;

  constructor(public usuarioService: UsuarioService,
              public database: DatabaseService,
              public router: Router) {

                this.initComplejo();
                this.loadComplejo();

               }

  loadComplejo(){
    if (this.complejoSubscriber){
      this.complejoSubscriber.unsubscribe();
      
    }
    this.complejoSubscriber = this.database.get<Complejo>(this.path, this.uid).subscribe(res=>{
      //console.log('LoadComplejo desde Service');
        if (res) {
          this.complejo = res;
          this.complejo$.next(this.complejo);


        }else{
          console.log('Else desde Service', res);
          this.initComplejo();
        }
    });
  }

  initComplejo(){
    this.complejo = {
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
      this.complejo$.next(this.complejo);
  }
  loadPromedio()
       {
        const enlace = this.path+this.uid+'/rates';
        this.database.getLength(enlace).subscribe( res =>{
          if (res) {
            this.promedio = this.complejo.likes / res.length;
             console.log('Cantidad de votantes desde servicio', this.promedio);

          }
        });
      return this.promedio;
       }

  getComplejo(): Observable<Complejo>{
    setTimeout(()=>{
      this.complejo$.next(this.complejo);
    }, 100);
    return this.complejo$.asObservable();
  }


}
