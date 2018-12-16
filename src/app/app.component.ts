import { Component } from '@angular/core';
import { ServicesService } from './services/services.service';
import { UserLogin } from './login/user-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Site personnel Esteban Launay';

  _username: string = '';
  _password: string = '';
  
  constructor(
    private service: ServicesService,
  ) {}

  login(){
    this.service.login(this._username, this._password).subscribe((data: UserLogin) =>{
      sessionStorage.setItem('authorization', data.token);
      sessionStorage.setItem('user', data.user.username);
      sessionStorage.setItem('expire', data.expires.toString());
    }); 
  }
}
