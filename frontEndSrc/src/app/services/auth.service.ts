import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  helper = new JwtHelperService();

 /*  private loggedIn: BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);
  get isLoggedIn(){
    return this.loggedIn.asObservable();
  } */

  baseUri:string = 'http://localhost:3000/users';
  bookmarkUri:String = 'http://localhost:3000/bookmark';
  contentUri:String = 'http://localhost:3000/content';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http:HttpClient) { }

  // Create
  registerUser(user): Observable<any> {
    let url= `${this.baseUri}/register`
    //console.log(user)
    return this.http.post(url, user,{headers:this.headers} ).pipe(catchError(this.errorMgmt))
    
  }
  // Get profile
  getProfile(id): Observable<any> {
    let url= `${this.baseUri}/profile/${id}`
    //console.log(user)
    return this.http.get(url,{headers:this.headers} ).pipe(catchError(this.errorMgmt))
    
  }

  // Login
  authenticateUser(authCredentials): Observable<any> {
    let url= `${this.baseUri}/authenticate`
    return this.http.post(url, authCredentials, { headers: this.headers}).pipe(catchError(this.errorMgmt))
    

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

  // Nav bar component hide
  loggedIn(){
    let isToken=localStorage.getItem('access_token');
    return this.helper.isTokenExpired(isToken);
  }

  // Create bookmark
  createBookmark(bookmark): Observable<any> {
    let url= `${this.bookmarkUri}/add`
    return this.http.post(url, bookmark ,{headers:this.headers}).pipe(catchError(this.errorMgmt))
    
  }

  //Create Content
  createContent(content): Observable<any> {
    let url= `${this.contentUri}/add`
    return this.http.post(url, content ,{headers:this.headers}).pipe(catchError(this.errorMgmt))
    
  }

  // User Dashboard
   showDashboard(userid){
    //headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url= `${this.bookmarkUri}/dashboard/${userid}`
    return this.http.get(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))
  } 

  //show user content on dashboard
  showContent(userid){
    let url= `${this.contentUri}/dashboard/${userid}`
    return this.http.get(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // Delete bookmark
  deletebookmark(bookmarkid){
    let url= `${this.bookmarkUri}/delete/${bookmarkid}`
    return this.http.delete(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))
    
  }

  // Show bookmark in editing form
  showBookmark(bookmarkid){
    let url=`${this.bookmarkUri}/add/${bookmarkid}`
    return this.http.get(url,{headers:this.headers}).pipe(catchError(this.errorMgmt))

  }

  // Edit bookmark
  editBookmark(bookmarkid,bookmark){
    console.log(bookmarkid)
    let url=`${this.bookmarkUri}/add/${bookmarkid}`
    return this.http.put(url,bookmark,{headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // show bookmark in edit form


  // Delete Content on user dashboard
  deleteContent(contentid){5
    let url= `${this.contentUri}/delete/${contentid}`
    return this.http.delete(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // Edit content
  editContent(contentid){
    let url=`${this.contentUri}/edit/${contentid}`
    return this.http.post(url,{headers:this.headers}).pipe(catchError(this.errorMgmt))
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