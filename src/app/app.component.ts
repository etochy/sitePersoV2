import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services/services.service';
import { UserLogin } from './login/user-login';
import { Ressource } from './blog/classes/ressource';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Site personnel Esteban Launay';

  constructor(
    private service: ServicesService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {

  }

}
