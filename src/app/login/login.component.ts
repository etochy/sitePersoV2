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
  chargement: boolean = false;
  deployer: boolean = false;
  error: boolean = false;
  valid: boolean = false;

  constructor(
    private service: ServicesService,
  ) {}

  login(){
    this.razIndic();
    this.chargement = true;
    this.service.login(this._username, this._password).subscribe((data: UserLogin) =>{
      this.chargement = false;
      sessionStorage.setItem('authorization', data.token);
      sessionStorage.setItem('user', data.user.username);
      sessionStorage.setItem('expire', data.expires.toString());
      this.valid = true;
      this.deployer = false;
    },
    error => {
      console.log('error');
      
      this.error = true;
      this.chargement = false;
    }); 
  }

  ngOnInit() {
  }
  
  razIndic(){
    this.chargement = false;
    this.error = false;
  }

  deployerLogin() {
    if (!this.valid) {
      this.deployer = !this.deployer;
      this.error = false;
    } else {
      this.valid = false;
      sessionStorage.clear();
    }
  }

}
