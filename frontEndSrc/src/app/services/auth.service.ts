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
  userr:any;
  n:any;

 /*  private loggedIn: BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);
  get isLoggedIn(){
    return this.loggedIn.asObservable();
  } */

  baseUri:string = 'http://localhost:3000/users';
  bookmarkUri:String = 'http://localhost:3000/bookmark';
  contentUri:String = 'http://localhost:3000/content';
  adminUri:String = 'http://localhost:3000/admin'
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

  /* // to check admin or user
  adminOrNot():Observable<any>{
    console.log(this.user)
    return this.user
  } */

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

  // Show public content
  showPublicContent(){
    let url= `${this.contentUri}/discover`
    return this.http.get(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))

  }

  // show content in editing form
  showContentByid(contentid){
    let url= `${this.contentUri}/add/${contentid}`
    return this.http.get(url,{headers:this.headers}).pipe(catchError(this.errorMgmt))
    
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

  // show description while paste link
  getDes(link){
    let url= `${this.bookmarkUri}/get`
    return this.http.put(url,link, {headers:this.headers} ).pipe(catchError(this.errorMgmt))

  }


  // Delete Content on user dashboard
  deleteContent(contentid){
    let url= `${this.contentUri}/delete/${contentid}`
    return this.http.delete(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // Edit content
  editContent(contentid,content){
    let url=`${this.contentUri}/add/${contentid}`
    return this.http.put(url,content,{headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // request to publish content
  requestPublish(contentid,status){
    let url=`${this.contentUri}/request/${contentid}`
    return this.http.put(url,status,{headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // Request to seen in admin page
  showRequest(){
    let url= `${this.adminUri}/request`
    return this.http.get(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))

  }

  // Admin approve the content to publish
  approveRequest(contentid,status){
    let url=`${this.adminUri}/approve/${contentid}`
    return this.http.put(url,status,{headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // Admin Reject the content to publish
  rejectRequest(contentid,status){
    let url=`${this.adminUri}/reject/${contentid}`
    return this.http.put(url,status,{headers:this.headers}).pipe(catchError(this.errorMgmt))
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