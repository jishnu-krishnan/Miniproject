import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'


@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  link: String;
  title: String;
  status: String;
  body: String;
  submitted= false;
  bookmarkForm: FormGroup;

  //STATUS:any = ['Private', 'Public']

  public Editor = ClassicEditor;

  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router: Router
  ) { this.mainForm(); }

  ngOnInit(): void {
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
      
      return false;
    } else {
      this.authService.createBookmark(JSON.stringify(bm)).subscribe(res => {
        console.log(res)
        if(res.success){
          console.log('User Successfully Bookmark');
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
