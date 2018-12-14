import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-article-detail',
  templateUrl: './page-article-detail.component.html',
  styleUrls: ['./page-article-detail.component.scss']
})
export class PageArticleDetailComponent implements OnInit {

  private idArticle: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.idArticle = this.route.snapshot.paramMap.get('id');
    this.getInfos();
  }

  getInfos() {
    console.log(this.idArticle);
  }

}
