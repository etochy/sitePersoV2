import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Actualite } from '../../classes/actualite';

@Component({
  selector: 'app-creation-post',
  templateUrl: './creation-post.component.html',
  styleUrls: ['./creation-post.component.scss']
})
export class CreationPostComponent implements OnInit {

  actuCreation: Actualite = new Actualite();
  chargement: boolean = false;
  creationOk: boolean = false;
  creationProbleme: boolean = false;
  error: string = '';

  constructor(
    private service: ServicesService,
  ) { }

  ngOnInit() {
  }

  /**
   * Creation d'un post d'actualité lors du clic
   */
  onSubmitActu() {
    if (this.actuCreation.title_eng === undefined || this.actuCreation.title_eng === '') {
      this.actuCreation.title_eng = this.actuCreation.title;
    }
    if (this.actuCreation.description_eng === undefined || this.actuCreation.description_eng === '') {
      this.actuCreation.description_eng = this.actuCreation.description;
    }

    this.actuCreation.akArticle = this.actuCreation.title.trim().toLowerCase() + this.actuCreation.date.toString();
    
    this.razBool();
    this.chargement = true;
    this.service.creerPost(this.actuCreation).subscribe(
      (data: any) => {
        this.chargement = false;
        this.actuCreation = new Actualite();
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

  /**
   * Remise a zero des indicateurs
   */
  razBool() {
    this.chargement = false;
    this.creationOk = false;
    this.creationProbleme = false;
  }

}
