import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  fechaNaci: Date = new Date();

  customPickerOptions = {
    buttons:[
      {
        text: 'Hola'
      },
      {
        text: 'Mundo'
      },
    ]
  };
  constructor() { }

  ngOnInit() {
  }

  cambioFecha(event){
    console.log(event);
    console.log(new Date(event.detail.value));
  }

}
