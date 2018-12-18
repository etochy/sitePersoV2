import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Article } from '../../classes/article';

@Component({
  selector: 'app-creation-article',
  templateUrl: './creation-article.component.html',
  styleUrls: ['./creation-article.component.scss']
})
export class CreationArticleComponent implements OnInit {

  actuCreation: Article = new Article();
  chargement: boolean = false;
  creationOk: boolean = false;
  creationProbleme: boolean = false;
  error: string = '';

  constructor(
    private service: ServicesService,
  ) { }

  ngOnInit() {
  }
  onSubmitActu() {
    if (this.actuCreation.title_eng === undefined || this.actuCreation.title_eng === '') {
      this.actuCreation.title_eng = this.actuCreation.title;
    }
    if (this.actuCreation.contenu_eng === undefined || this.actuCreation.contenu_eng === '') {
      this.actuCreation.contenu_eng = this.actuCreation.contenu;
    }

    this.actuCreation.akBlog = this.actuCreation.title.trim().toLowerCase();
    
    console.log(this.actuCreation);
    
    this.razBool();
    this.chargement = true;
    this.service.creerArticle(this.actuCreation).subscribe(
      (data: any) => {
        console.log(data);
        
        this.chargement = false;
        this.actuCreation = new Article();
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
