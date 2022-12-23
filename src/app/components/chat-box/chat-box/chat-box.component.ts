import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {

  @Input() chat: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  @Input() current_user_id;

  constructor() { }

  ngOnInit() {}

}
