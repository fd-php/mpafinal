import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;
  @Output() avatarSel = new EventEmitter<string>();

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  avatarSlide = {
    slidesPerView: 3.5
  };
  constructor() { }

  ngOnInit() {}

  seleccionarAvatar( avatar ){
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;

    console.log(avatar.img);
     this.avatarSel.emit(avatar.img);
  };

}
