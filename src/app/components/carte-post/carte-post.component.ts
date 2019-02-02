import { Component, OnInit, Input } from '@angular/core';
import { Actualite } from 'src/app/blog/classes/actualite';
import { ServicesService } from 'src/app/services/services.service';
import { Commentaire } from 'src/app/blog/classes/commentaire';
import { error } from 'util';

@Component({
  selector: 'app-carte-post',
  templateUrl: './carte-post.component.html',
  styleUrls: ['./carte-post.component.scss']
})
export class CartePostComponent implements OnInit {
  @Input() post: Actualite;
  
  comments: Commentaire[] = [];
  skip: number = 0;
  commentCrea: Commentaire = new Commentaire();
  
  constructor(
    private service: ServicesService,
  ) { }

  ngOnInit() {    
    this.initComments();
  }

  initComments() {
    this.service.getCommentaires(this.post.akArticle, 0, 5).subscribe((data: Commentaire[]) => {
      this.comments = data;
      this.skip = data.length;
    });
  }

  chargerPlus() {
    this.service.getCommentaires(this.post.akArticle, this.skip, 5).subscribe((data: Commentaire[]) => {
      data.forEach(element => {
        this.comments.push(element);
        this.skip ++;
      });
    });
  }

  creerCommentaire() {
    let com = new Commentaire();
    com.akArticle = this.post.akArticle;
    com.name = this.commentCrea.name;
    com.date = new Date();
    com.comment = this.commentCrea.comment;
    this.service.creerCommentaire(com).subscribe((data: any) => {
      this.commentCrea = new Commentaire();
      this.initComments();
    },
    error => {
    });
  }

}
