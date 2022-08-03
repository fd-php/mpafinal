import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Componente, Slides } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient) { }

  // getUsuarios(){
  //   return this.http.get('https://jsonplaceholder.typicode.com/users');
  // }
  getMenuOpts(){
    return this.http.get<Componente[]>('/assets/data/menu-opts.json');
  }
  // getMenuShortOpts(){
  //   return this.http.get<Componente[]>('/assets/data/menu-short-opts.json');
  // }
  getSlides(){
    return this.http.get<Slides[]>('/assets/data/menu-slides.json');
  }

}
