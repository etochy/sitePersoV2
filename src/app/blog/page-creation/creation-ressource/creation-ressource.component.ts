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

  constructor(
    private service: ServicesService,
  ) { }

  ngOnInit() {
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

  razBool() {
    this.chargement = false;
    this.creationOk = false;
    this.creationProbleme = false;
  }
}
