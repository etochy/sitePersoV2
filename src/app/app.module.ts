import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { BoutonComponent } from './components/bouton/bouton.component';
import { ActualiteComponent } from './blog/actualite/actualite.component';
import { PageAccueilBlogComponent } from './blog/page-accueil-blog/page-accueil-blog.component';
import { PageAccueilProComponent } from './pro/page-accueil-pro/page-accueil-pro.component';
import { PageArticlesComponent } from './blog/articles/page-articles/page-articles.component';
import { PageArticleDetailComponent } from './blog/articles/page-article-detail/page-article-detail.component';
import { LoginComponent } from './login/login.component';
import { PageCreationComponent } from './blog/page-creation/page-creation.component';
import { HttpIntercepteur } from './http-intercepteur';
import { HttpClientModule } from '@angular/common/http'; 

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PageAccueilComponent,
    BoutonComponent,
    ActualiteComponent,
    PageAccueilBlogComponent,
    PageAccueilProComponent,
    PageArticlesComponent,
    PageArticleDetailComponent,
    LoginComponent,
    PageCreationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpIntercepteur,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
