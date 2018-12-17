import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Actualite } from '../classes/actualite';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.scss']
})
export class ActualiteComponent implements OnInit {
  
  private _filActu: Actualite[] = [];

  constructor(
    private service: ServicesService,
  ) { }

  ngOnInit() {
    this.chargerFil(0,5);
  }

  chargerFil(skip: number, limit: number) {
    this.service.getPosts(skip, limit).subscribe((data: Actualite[]) => {
      data.forEach(element => {
        this._filActu.push(element);
      });      
    });
  }

  creerArticle() {
    let actu: Actualite = new Actualite();
    actu.akArticle = 'akArt2';
    actu.description = 'coucou';
    actu.title = 'yeah test';
    this.service.creerPost(actu).subscribe((data) => {
    })
  }

}
