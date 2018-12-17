import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Actualite } from '../blog/classes/actualite';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private url = environment.urlServer;

  constructor(
    private http: HttpClient,
  ) {}

  imageHeaderAccueil() {
    return ;
  }
  imageHeaderPro(){
    return ;
  }
  imageHeaderBlog() {
    return ;
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
    return throwError('Something bad happened; please try again later.');
  };
}
