import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualiteComponent } from './blog/actualite/actualite.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { PageAccueilBlogComponent } from './blog/page-accueil-blog/page-accueil-blog.component';
import { PageAccueilProComponent } from './pro/page-accueil-pro/page-accueil-pro.component';
import { PageArticlesComponent } from './blog/articles/page-articles/page-articles.component';
import { PageArticleDetailComponent } from './blog/articles/page-article-detail/page-article-detail.component';
import { PageCreationComponent } from './blog/page-creation/page-creation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnderConstructComponent } from './under-construct/under-construct.component';

const routes: Routes = [
  { path: '', component: PageAccueilComponent },
  { path: 'blog', component: PageAccueilBlogComponent },
  // { path: 'blog/actualite', component: ActualiteComponent },
  // { path: 'blog/articles', component: PageArticlesComponent },
  { path: 'blog/articles', component: UnderConstructComponent },
  // { path: 'blog/articles/:id', component: PageArticleDetailComponent },
  { path: 'blog/articles/:id', component: UnderConstructComponent },
  { path: 'creation', component: PageCreationComponent },
  { path: 'pro', component: PageAccueilProComponent },
  { path: '**', component: NotFoundComponent },

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
