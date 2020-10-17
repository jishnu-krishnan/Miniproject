import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  baseUri:string = 'http://localhost:3000/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }

  // Create
  registerUser(user): Observable<any> {
    let url= `${this.baseUri}/register`
    return this.http.post(url, user).pipe(catchError(this.errorMgmt))
    
  }
  
  // Login
  authenticateUser(authCredentials): Observable<any> {
    let url= `${this.baseUri}/authenticate`
    return this.http.post(url, authCredentials, {withCredentials:true, headers: this.headers}).pipe(catchError(this.errorMgmt))
    

  }   

  //Set token
  storeUserToken(token, user){
  localStorage.setItem('access_token', token)
  localStorage.setItem('user', JSON.stringify(user))
  this.authToken = token
  this.user = user
  
}

  //logout
  logout() {
    this.authToken= null;
    localStorage.clear();
  }


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}