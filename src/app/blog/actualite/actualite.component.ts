import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Actualite } from '../classes/actualite';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.scss']
})
export class ActualiteComponent implements OnInit {
  
  _filActu: Actualite[] = [];
  skip: number = 0;
  limit: number = 5;

  constructor(
    private service: ServicesService,
  ) { }

  ngOnInit() {
    this.chargerFil(this.skip,this.limit);
  }

  chargerFil(skip: number, limit: number) {
    this.service.getPosts(skip, limit).subscribe((data: Actualite[]) => {
      let n = 0;
      data.forEach(element => {
        n++;
        this._filActu.push(element);        
      });   
      this.skip += n;   
    });
  }

  chargerPlus() {
    this.chargerFil(this.skip, this.limit);
  }
}
