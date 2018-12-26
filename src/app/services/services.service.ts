import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Actualite } from '../blog/classes/actualite';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ressource } from '../blog/classes/ressource';
import { Article } from '../blog/classes/article';
import { componentFactoryName } from '@angular/compiler';
import { Message } from '../blog/classes/message';
import { URLSearchParams } from 'url';


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

  /**
   * Recupere les ressources et notifie les composants abonnés
   */
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

  getUneRessource(st: string): string {
    let res = '';
    this.ressources.forEach(element => {     
      if (element.akRessource === st) {
        res = element.ressource;
      }
    });
    return res;
  }
  
  /**
   * Creation dde ressource
   * @param post 
   */
  creerRessource(post: Ressource){
    return this.http.post(this.url + '/ressources', post)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  /**
   * Modification de ressource
   * @param post 
   */
  updateRessource(post: Ressource){
    return this.http.put(this.url + '/ressources/' + post.akRessource , post)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  /**
   * Recupere toutes les ressources
   */
  getRessources(){
    return this.http.get(this.url + '/ressources')
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  /**
   * Récupere un nombre de Posts
   * @param skip nombre a ne pas recuperer
   * @param limit nombre a récuperer
   */
  getPosts(skip: number, limit: number) {    

    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams().set('limit', limit.toString()).set('skip', skip.toString()) };
    return this.http.get(this.url + '/articles', options)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  /**
   * Récupere un post precis
   * @param id 
   */
  getPostUnique(id: number){
    return this.http.get(this.url + '/articles/' + id)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  /**
   * Creation de post pour fil actualite
   * @param post 
   */
  creerPost(post: Actualite){
    return this.http.post(this.url + '/articles', post)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  /**
   * Creation d'article du blog
   * @param post 
   */
  creerArticle(post: Article){
    return this.http.post(this.url + '/blog', post)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  /**
   * Mise a jour de la position 
   * @param user 
   */
  majPosition(user: any){
    return this.http.put(this.url + "/utilisateurs/update-position/" + user.idUtil, user)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getUser(user: string){
    return this.http.get(this.url + "/utilisateurs/" + user)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  /**
   * Envoi message via formulaire contact
   * @param message 
   */
  envoyerMessage(message: Message) {
    return this.http.post(this.url + "/contacter", message)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  /**
   * Service de connexion
   * @param username 
   * @param password 
   */
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

  /**
   * Gere les types d'erreurs
   * @param error 
   */
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

  /**
   * Permet à un composant de s'abonner au service pour etre notifié lorsque les ressources sont récupérées
   * @param comp 
   */
  abonnement(comp) {
    this.components.push(comp);
    comp.notif();
  }
}
