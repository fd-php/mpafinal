/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Rate } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DatabaseService } from '../../services/database.service';


enum COLORS {
  GREY = '#E0E0E0',
  GREEN = '#76FF03',
  YELLOW= '#FFCA28',
  RED = 'DD2C00',
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})





export class RatingComponent implements OnInit {

  @Input() rating: number;
  @Input() complejo: string;
  @Input() likes: number;
  @Input() votoLikes!: number;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();


  ratesActual: number = null;
  suma: number = null;
  estado = false;
//  votoLikes = null;
  divisor = null;

  constructor(
              private usuarioservice: UsuarioService,
              private database: DatabaseService,

              ) {

              }

 async rate(index: number) {
      //Obtengo parametros
      const uid =   this.usuarioservice.getUserProfileId();
      const path = 'Complejos/'+this.complejo+'/rates';

      this.rating = index;
      this.ratingChange.emit(this.rating);
      //construyo mi arreglo
      const data: Rate = {
        uid,
        estado: !this.estado,
        fecha: new Date(),
        rates: this.rating
      } ;
      const actual = this.ratesActual;
        // cargo rate por usuario
       await this.database.altaUsuario(data,path,uid);

        //aca suma acumulador
        this.suma = data.rates - actual;

        // Actualizo rate acumulador
        this.addRate(this.suma);
   }

   //Funcion para actulizar rate acumulador
     addRate(suma: number ){
      const id =   this.complejo;
      const path = 'Complejos/';

            const data ={
            likes : this.likes + suma
             };
            this.database.updateDoc(data, path, id);

     }

     //cargo el rate actual del usuario
   loadRates(){
    const uid =   this.usuarioservice.getUserProfileId();
    const path = 'Complejos/'+this.complejo+'/rates';

    this.database.get<Rate>(path, uid).subscribe( res =>{
      if (res) {
        this.ratesActual = res.rates;
        //this.estado = res.estado;

      }
    });

      }


  getColor(index: number) {

     if (this.isAboveRating(index)) {
      return COLORS.GREY;
     }
     switch (this.rating){
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;

     }

    }

   isAboveRating(index: number): boolean {
  //   // returns whether or not the selected index is above ,the current rating
  //   // function is called from the getColor function.
   return index > this.rating;
   }


   ngOnInit(): void {
    this.loadRates();
    this.rating = 2;
    this.ratingChange.emit(this.rating);
  }


}
