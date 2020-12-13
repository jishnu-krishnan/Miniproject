import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
bookmark :any=[];
content : any=[];
submitted= false;
searchForm:FormGroup;
status: String;
profile :String;
searchText:String;
type:String;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) { this.mainForm(); }

  mainForm(){
    this.searchForm = this.fb.group({
      body: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    const user= JSON.parse(localStorage.getItem('user'))
//console.log(user)
     this.authService.getProfile(user.id).subscribe(res =>{
      //console.log(res) 
      this.profile=res.name
      
     },(error)=>{
       console.log(error)
     });

      this.authService.showDashboard(user.id).subscribe(res => {
      //console.log(res)
      this.bookmark=res
      this.type='bookmark'
      //console.log(this.bookmark)
    },(error)=> {
      console.log(error)
    }); 

     /* this.authService.showContent(user.id).subscribe(res =>{
      console.log(res)
      this.content=res
    },(error)=>{
      console.log(error)
    }); */
  }

  onBookmark(){
    const user= JSON.parse(localStorage.getItem('user'))

    this.authService.showDashboard(user.id).subscribe(res => {
      //console.log(res)
      this.bookmark=res
      this.type='bookmark'
      //console.log(this.bookmark)
    },(error)=> {
      console.log(error)
    });
    //this.ngOnInit()
  }

  onContent(){
    const user= JSON.parse(localStorage.getItem('user'))

    this.authService.showContent(user.id).subscribe(res =>{
      console.log(res)
      this.bookmark=res
      this.type='content'

    },(error)=>{
      console.log(error)
    });
  }

  onDelete(id){
    //console.log(id)
    if(window.confirm('Are you sure?')){
      this.authService.deletebookmark(id).subscribe(res => {
      //console.log(res)
      this.ngOnInit();
      },(error)=>{
        console.log(error)
      });
    }
  }
  onRequest(id){
    if(window.confirm('Are you Sure?')){
      const up={
        status:'pending'
      }
      this.authService.requestPublish(id,JSON.stringify(up)).subscribe(res =>{
        console.log(res)
        this.router.navigateByUrl('/users/dashboard')
      });
    }
  }

  /*onEditBookmark(id){
     this.authService.showBookmark(id).subscribe(res => {
     // this.ngOnInit();
    },(error)=>{
      console.log(error)
    }); 
  }*/

  onDeleteContent(id){
    if(window.confirm('Are you sure?')){
      this.authService.deleteContent(id).subscribe(res => {
      //console.log(res)
      this.ngOnInit();
      },(error)=>{
        console.log(error)
      });
    }
  }

  /*onEditContent(id){
    this.authService.editContent(id).subscribe(res =>{
      this.ngOnInit();
    },(error)=> {
      console.log(error)
    });
  }*/
  get myForm(){
    //this.title.setValue('jishnu')
    return this.searchForm.controls;
  }
  
  /* onSubmit(){
    //console.log('sfsdf')
    this.submitted=true;
    if(!this.searchForm.valid){
      return false
    }else{
      console.log(this.searchForm.value)

      this.authService.searchContent(this.searchForm.value).subscribe(res=>{
        console.log(res)
        this.content=res
        this.type='Contents'
        this.router.navigateByUrl('/users/dashboard')
      });*/
      /* this.authService.searchBookmark(this.searchForm.value).subscribe(res=>{
        this.bookmark=res
        this.type='Bookmark'
        this.router.navigateByUrl('/users/dashboard')
      }) */

   // }
  //} 
}
