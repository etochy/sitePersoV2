import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Message } from 'src/app/blog/classes/message';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-page-accueil-pro',
  templateUrl: './page-accueil-pro.component.html',
  styleUrls: ['./page-accueil-pro.component.scss']
})
export class PageAccueilProComponent implements OnInit {

  width: number;
  height: number;
  trustedStyle;

  // Formulaire
  email: string;
  sujet: string;
  message: string;

  chargement: boolean = false;
  creationOk: boolean = false;
  creationProbleme: boolean = false;
  error: boolean = false;

  img1: string;
  img2: string;
  img3: string;

  constructor(
    private service: ServicesService,
    private sanitizer: DomSanitizer,
  ) { 
    window.addEventListener('resize', this.resize);
  }

  ngOnInit() {
    this.resize();
    this.service.abonnement(this);
  }

  resize() {
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.width < 400) {
      this.trustedStyle = 'auto';
    } else {
      this.trustedStyle = this.height-64 + 'px';
    }
  }
  ngDoCheck() {
    console.log('test');
    this.resize();
  }

  notif(){
    this.img1 = this.service.getUneRessource("imgPro1");
    this.img2 = this.service.getUneRessource("imgPro2");
    this.img3 = this.service.getUneRessource("imgPro3");
  }

  onSubmitMessage(){
    let m = new Message(this.email, this.sujet, this.message);
      this.service.envoyerMessage(m).subscribe(
      (data: any) => {
        this.email = '';
        this.sujet = '';
        this.message = '';
        this.chargement = false;
        this.creationOk = true;
      },
      error => {
        this.chargement = false;
        this.creationProbleme = true;
        this.error = error.error;
      }
    );
  }
}
