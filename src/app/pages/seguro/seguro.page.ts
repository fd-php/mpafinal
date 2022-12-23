import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seguro',
  templateUrl: './seguro.page.html',
  styleUrls: ['./seguro.page.scss'],
})
export class SeguroPage implements OnInit {

  qrCodeString = 'aqui mensaje en qr';

  constructor() { }

  ngOnInit() {

  }

}
