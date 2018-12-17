import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { UserLogin } from './user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  _username: string = '';
  _password: string = '';
  
  constructor(
    private service: ServicesService,
  ) {}

  login(){
    this.service.login(this._username, this._password).subscribe((data: UserLogin) =>{
      console.log(data);
      sessionStorage.setItem('authorization', data.token);
      sessionStorage.setItem('user', data.user.username);
      sessionStorage.setItem('expire', data.expires.toString());
    }); 
  }

  ngOnInit() {
  }

}
