import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  title: String;
  status: String;
  body: String;
  submitted= false;
  contentForm: FormGroup;

  //STATUS:any = ['Private', 'Public']

  public Editor = ClassicEditor;

  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router: Router
  ){ this.mainForm(); }

  mainForm(){
    this.contentForm = this.fb.group({
      //link: ['',[Validators.required]],
      title: ['',[Validators.required]],
      //status: ['',[Validators.required]],
      status:['private'],
      body: ['',[Validators.required]]
    })
  }


  ngOnInit(): void {
  }

  get myForm(){
    return this.contentForm.controls;
  } 

  onSubmit(){
    this.submitted= true;
    const c= this.contentForm.value
    const user= JSON.parse(localStorage.getItem('user'))
     const cm={
      title:c.title,
      status:c.status,
      body:c.body,
      user:user.id
    } 
 
 console.log(JSON.stringify(cm))
 if(!this.contentForm.valid){
  return false;
 } else {
   console.log(this.authService.createContent(JSON.stringify(cm)).subscribe(res =>{}))
   this.authService.createContent(JSON.stringify(cm)).subscribe(res =>{
    console.log(res)
    if(res.success){
        console.log('User Successfully Content');
        this.router.navigateByUrl('/users/dashboard')
    } else {
        console.log('Somethings wrong');
        this.router.navigateByUrl('/content/add')
    }
   },(error)=> {
     console.log(error)
   });
  }
  }

}
