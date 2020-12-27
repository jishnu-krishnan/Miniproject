import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { Options } from 'url-metadata';
//const urlMetadata= require('url-metadata')

import { AuthService } from '../../../../services/auth.service';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { __param } from 'tslib';


@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  id: String;
  link: String;
  title: String;
  status: String;
  body: String;
  submitted= false;
  bookmarkForm: FormGroup;

  bookmark :any=[];

  //STATUS:any = ['Private', 'Public']

  public Editor = ClassicEditor;
  //public data = '<p>tyuhi</p>';
  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) { this.mainForm(); }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    //console.log(this.id)
    if(this.id!=undefined){
      this.authService.showBookmarkByid(this.id).subscribe(res =>{
        
        this.bookmarkForm.controls['title'].setValue(res.title)
        this.bookmarkForm.controls['body'].setValue(res.body)
        this.bookmarkForm.controls['link'].setValue(res.link)
        //this.bookmark=res
        //this.Editor=res
        //console.log('ifg',this.Editor)
      },(error)=>{
        console.log(error)
      });
    }
  }
  
  mainForm(){
    this.bookmarkForm = this.fb.group({
      link: ['',[Validators.required]],
      title: ['',[Validators.required]],
      //status: ['',[Validators.required]],
      status:['private'],
      body: ['',[Validators.required]]
    })
  }

   get myForm(){
    return this.bookmarkForm.controls;
  } 

   getData(){
    const l =this.bookmarkForm.value.link
    //console.log(l)
    const lk={
      link:l
    }
    this.authService.getDes(JSON.stringify(lk)).subscribe(res=>{
      //console.log(res)
      this.bookmarkForm.controls['title'].setValue(res.title)
      this.bookmarkForm.controls['body'].setValue(res.Description)
      //this.router.navigateByUrl('/bookmark/add')
    })
  
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
      user:user.id,
      reason:''
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
            this.router.navigateByUrl('/users/dashboard')
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
          this.router.navigateByUrl('/users/dashboard')
        }else{
          console.log('Somethings wrong');
          this.router.navigateByUrl('/bookmark/add')
        }
      },(error)=> {
        console.log(error);
      });
    } 
  }
}
