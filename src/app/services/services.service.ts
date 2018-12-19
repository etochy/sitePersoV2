import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Actualite } from '../blog/classes/actualite';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ressource } from '../blog/classes/ressource';
import { Article } from '../blog/classes/article';
import { componentFactoryName } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private url = environment.urlServer;
  ressources: Ressource[] = [];
  public imageHeader: string = '';
  public imageAccueil: string = '';

  components: any[] = [];

  constructor(
    private http: HttpClient,
  ) {
    this.init();
  }

  init() {
    this.getRessources().subscribe((data: Ressource[]) => {
      data.forEach(element => {
        this.ressources.push(element);
      });
      
      //VAR
      this.ressources.forEach(element => {
        if (element.akRessource === 'imageHeader') {
          this.imageHeader = element.ressource;
        }
        if (element.akRessource === 'imageAccueil') {
          this.imageAccueil = element.ressource;
        }
      });      
      this.components.forEach(e => {
        e.notif();
      });
    });
  }
  
  creerRessource(post: Ressource){
    return this.http.post(this.url + '/ressources', post)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  updateRessource(post: Ressource){
    return this.http.put(this.url + '/ressources/' + post.akRessource , post)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  getRessources(){
    return this.http.get(this.url + '/ressources')
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getPosts(skip: number, limit: number) {

    let params = new HttpParams();
    params.set('skip', skip.toString());
    params.set('limit', limit.toString());

    const options = {params};

    return this.http.get(this.url + '/articles', options)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getPostUnique(id: number){
    return this.http.get(this.url + '/articles/' + id)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  creerPost(post: Actualite){
    return this.http.post(this.url + '/articles', post)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  creerArticle(post: Article){
    return this.http.post(this.url + '/blog', post)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  majPosition(user: any){
    return this.http.put(this.url + "/utilisateurs/update-position/" + user.idUtil, user)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  login(username: string, password: string){
    const body = {
      username: username,
      password: password
    }

    return this.http.post( this.url + '/login', body)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {    
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };

  
  abonnement(comp) {
    this.components.push(comp);
  }
}
