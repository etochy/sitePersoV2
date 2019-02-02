import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Message } from '../blog/classes/message';

@Component({
  selector: 'app-page-messages',
  templateUrl: './page-messages.component.html',
  styleUrls: ['./page-messages.component.scss']
})
export class PageMessagesComponent implements OnInit {

  messages: Message[] = [];

  constructor(
    private service: ServicesService
  ) { }

  ngOnInit() {
    this.service.getMessages().subscribe((data: Message[]) => {
      this.messages = data;   
    });
  }

}
