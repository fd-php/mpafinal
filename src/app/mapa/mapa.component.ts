import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  verUbicacion(event){
    console.log('Ubicacion Mapa', event);
  }

}
