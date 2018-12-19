import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  
  title = 'pageAccueil';
  imgAccueil = this.service.imageAccueil;
  image: string;
  constructor(
    private service: ServicesService,
  ) {}

  ngOnInit(): void {
    this.service.abonnement(this);
  }

  notif(){
    this.imgAccueil = this.service.imageAccueil;
  }

}
