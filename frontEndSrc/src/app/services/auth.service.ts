import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
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

  //check already registered or not
  checkRegistered(mail): Observable<any>{
    let url = `${this.baseUri}/check`
    return this.http.put(url, mail,{headers: this.headers}).pipe(catchError(this.errorMgmt))
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
   showDashboard(userid):Observable<any>{
    //headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url= `${this.bookmarkUri}/dashboard/${userid}`
    return this.http.get(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))
  } 

  //show user content on dashboard
  showContent(userid):Observable<any>{
    let url= `${this.contentUri}/dashboard/${userid}`
    return this.http.get(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // Show public content
  showPublicContent():Observable<any>{
    let url= `${this.contentUri}/discover`
    return this.http.get(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))

  }

  //show public bookmark
  showPublicDashboard():Observable<any>{
    let url= `${this.bookmarkUri}/discover`
    return this.http.get(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))

  }

  // show content in editing form
  showContentByid(contentid):Observable<any>{
    
    let url= `${this.contentUri}/add/${contentid}`
    return this.http.get(url,{headers:this.headers}).pipe(catchError(this.errorMgmt))
    
  }
  // show content in editing form
  showBookmarkByid(bookmarkid):Observable<any>{
      
    let url= `${this.bookmarkUri}/add/${bookmarkid}`
    return this.http.get(url,{headers:this.headers}).pipe(catchError(this.errorMgmt))
    
  }

  // Search Content
  searchContent(content):Observable<any>{
    //const user= JSON.parse(localStorage.getItem('user'))
    console.log(content)
    let url = `${this.contentUri}/search`
    return this.http.put(url,content,{headers:this.headers}).pipe(catchError(this.errorMgmt))

  }

  // Search Content
  searchBookmark(bookmark):Observable<any>{
    const user= JSON.parse(localStorage.getItem('user'))
    let url = `${this.bookmarkUri}/search/${user.id}`
    return this.http.put(url,bookmark,{headers:this.headers}).pipe(catchError(this.errorMgmt))

  }

  // Delete bookmark
  deletebookmark(bookmarkid):Observable<any>{
    let url= `${this.bookmarkUri}/delete/${bookmarkid}`
    return this.http.delete(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))
    
  }

  // Show bookmark in editing form
  showBookmark(bookmarkid):Observable<any>{
    let url=`${this.bookmarkUri}/add/${bookmarkid}`
    return this.http.get(url,{headers:this.headers}).pipe(catchError(this.errorMgmt))

  }

  // Edit bookmark
  editBookmark(bookmarkid,bookmark):Observable<any>{
    console.log(bookmarkid)
    let url=`${this.bookmarkUri}/add/${bookmarkid}`
    return this.http.put(url,bookmark,{headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // show description while paste link
  getDes(link):Observable<any>{
    let url= `${this.bookmarkUri}/get`
    return this.http.put(url,link, {headers:this.headers} ).pipe(catchError(this.errorMgmt))

  }


  // Delete Content on user dashboard
  deleteContent(contentid):Observable<any>{
    let url= `${this.contentUri}/delete/${contentid}`
    return this.http.delete(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // Edit content
  editContent(contentid,content):Observable<any>{
    let url=`${this.contentUri}/add/${contentid}`
    return this.http.put(url,content,{headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // request to publish content
  requestPublish(contentid,status):Observable<any>{
    let url=`${this.contentUri}/request/${contentid}`
    return this.http.put(url,status,{headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // Request to seen in admin page
  showRequest():Observable<any>{
    let url= `${this.adminUri}/request`
    return this.http.get(url, {headers:this.headers}).pipe(catchError(this.errorMgmt))

  }

  // Admin approve the content to publish
  approveRequest(contentid,status):Observable<any>{
    let url=`${this.adminUri}/approve/${contentid}`
    return this.http.put(url,status,{headers:this.headers}).pipe(catchError(this.errorMgmt))
  }

  // Admin Reject the content to publish
  rejectRequest(contentid,status):Observable<any>{
    let url=`${this.adminUri}/reject/${contentid}`
    return this.http.put(url,status,{headers:this.headers}).pipe(catchError(this.errorMgmt))
  }
// Admin Reject the content to publish
rejectBookmark(bookid,status):Observable<any>{
  let url=`${this.adminUri}/rejectbookmark/${bookid}`
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