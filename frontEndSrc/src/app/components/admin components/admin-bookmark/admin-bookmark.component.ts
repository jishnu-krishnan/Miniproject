import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from "../../../services/auth.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { __param } from 'tslib';

@Component({
  selector: 'app-admin-bookmark',
  templateUrl: './admin-bookmark.component.html',
  styleUrls: ['./admin-bookmark.component.css']
})
export class AdminBookmarkComponent implements OnInit {

  id: String;
  link: String;
  title: String;
  status: String;
  body: String;
  submitted= false;
  bookmarkForm: FormGroup;

  bookmark :any=[];

  public Editor = ClassicEditor;
  constructor(public fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) { this.mainForm(); }

  mainForm(){
    this.bookmarkForm = this.fb.group({
      link: ['',[Validators.required]],
      title: ['',[Validators.required]],
      //status: ['',[Validators.required]],
      status:['public'],
      body: ['',[Validators.required]]
    })
  }


  get myForm(){
    return this.bookmarkForm.controls;
  } 


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    //console.log(this.id)
    if(this.id!=undefined){
      this.authService.showBookmark(this.id).subscribe(res =>{
        this.bookmark=res
        //this.Editor=res
        //console.log('ifg',this.Editor)
      },(error)=>{
        console.log(error)
      });
    }
  }

  onSubmit(){
    this.submitted= true;
    const b= this.bookmarkForm.value
    const user= JSON.parse(localStorage.getItem('user'))
     const bm={
      link:b.link,
      title:b.title,
      status:b.status,
      body:b.body,
      user:user.id
    } 
    //console.log(JSON.stringify(bm))
    
    //console.log(user.id)
    
    console.log(b)
     if(!this.bookmarkForm.valid){
      //console.log("fghj")
      return false;
    } else if(this.id!=undefined){
      if (window.confirm('Are you sure?')) {
        this.authService.editBookmark(this.id,JSON.stringify(bm)).subscribe(res=>{
          //if(res.success){
            console.log(res);
            this.router.navigateByUrl('/admin/dashboard')
          //} else {
              //console.log('Somethings wrong');
              //this.router.navigateByUrl('/bookmark/add/:id')
          //}
        });
      }
    } else {
      this.authService.createBookmark(JSON.stringify(bm)).subscribe(res => {
        //console.log(res)
        if(res.success){
          console.log('Successfully enter Bookmark');
          this.router.navigateByUrl('/admin/dashboard')
        }else{
          console.log('Somethings wrong');
          this.router.navigateByUrl('/admin/bookmark')
        }
      },(error)=> {
        console.log(error);
      });
    } 
  }
}

