import { Component, OnInit } from '@angular/core';
import { Ressource } from '../../classes/ressource';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-creation-ressource',
  templateUrl: './creation-ressource.component.html',
  styleUrls: ['./creation-ressource.component.scss']
})
export class CreationRessourceComponent implements OnInit {

  ressourceCreation: Ressource = new Ressource();
  chargement: boolean = false;
  creationOk: boolean = false;
  creationProbleme: boolean = false;
  error: string = '';

  ressourcesExistantes: Ressource[] = [];

  constructor(
    private service: ServicesService,
  ) { }

  ngOnInit() {
    this.service.getRessources().subscribe((data: Ressource[])=> {
      data.forEach(element => {
        this.ressourcesExistantes.push(element);
      });
    });
  }

  onSubmitRessource() {
    if (this.ressourceCreation.ressource_eng === undefined || this.ressourceCreation.ressource_eng === '') {
      this.ressourceCreation.ressource_eng = this.ressourceCreation.ressource;
    }
    this.razBool();
    this.chargement = true;
    this.service.creerRessource(this.ressourceCreation).subscribe(
      (data: any) => {
        this.chargement = false;
        this.ressourceCreation = new Ressource();
        this.creationOk = true;
      },
      error => {
        this.chargement = false;
        this.creationProbleme = true;
        console.log(error.error);
        this.error = error.error;
      }
    );
  }

  onModifRessource(res: Ressource){
    this.razBool();
    this.chargement = true;
    console.log(res);
    
    this.service.updateRessource(res).subscribe(
      (data: any) => {
        console.log(data);
        this.chargement = false;
        this.creationOk = true;
      },
      error => {
        this.chargement = false;
        this.creationProbleme = true;
        console.log(error.error);
        this.error = error.error;
      }
    );
  }
  toggle(res: any) {
    res.isActive = true;
  }
  razBool() {
    this.chargement = false;
    this.creationOk = false;
    this.creationProbleme = false;
  }
}
