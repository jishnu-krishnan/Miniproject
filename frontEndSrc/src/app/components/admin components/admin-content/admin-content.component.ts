import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css']
})
export class AdminContentComponent implements OnInit {

  id: String;
  title: String;
  status: String;
  body: String;
  submitted= false;
  contentForm: FormGroup;

  content :any=[];
  public Editor = ClassicEditor;

  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){ this.mainForm(); }

  mainForm(){
    this.contentForm = this.fb.group({
      //link: ['',[Validators.required]],
      title: ['',[Validators.required]],
      //status: ['',[Validators.required]],
      status:['public'],
      body: ['',[Validators.required]]
    })
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if(this.id!=undefined){
      this.authService.showContentByid(this.id).subscribe(res=>{
        this.content=res
      },(error)=>{
        console.log(error)
      });
    }
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
 
 //console.log(JSON.stringify(cm))
 if(!this.contentForm.valid){
  return false;
 } else if(this.id!=undefined){
    if(window.confirm('Are you sure?')){
      this.authService.editContent(this.id,JSON.stringify(cm)).subscribe(res=>{
        console.log(res)
        this.router.navigateByUrl('/admin/dashboard')
      });
    }
 } else {
    this.authService.createContent(JSON.stringify(cm)).subscribe(res =>{
    console.log(res)
    if(res.success){
        console.log('User Successfully Content');
        this.router.navigateByUrl('/admin/dashboard')
    } else {
        console.log('Somethings wrong');
        this.router.navigateByUrl('/admin/content')
    }
   },(error)=> {
     console.log(error)
   });
  }
  }

}

