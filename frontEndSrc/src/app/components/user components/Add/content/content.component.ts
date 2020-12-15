import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  //title = new FormControl('');
  id: String;
  title: any;
  status: String;
  body: String;
  submitted= false;
  contentForm: FormGroup;
  content :any=[];
  //STATUS:any = ['Private', 'Public']

  public Editor = ClassicEditor;

  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute,
    //private fc:FormControl
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
    this.id = this.route.snapshot.params['id']
    
    if(this.id!=undefined){
      this.authService.showContentByid(this.id).subscribe(res=>{
        
        //this.content=res
        //console.log(res.title)
        this.contentForm.controls['title'].setValue(res.title)
        this.contentForm.controls['body'].setValue(res.body)
        //this.content=res
      },(error)=>{
        console.log(error)
      });
    }
    
  }

  get myForm(){
    //this.title.setValue('jishnu')
    return this.contentForm.controls;
  } 

  updateValue(){
    //this.title.ser
    //const n=this.title.setValue('jishnu')
    //console.log(n)
  }

  onSubmit(){
    this.submitted= true;
    const c= this.contentForm.value
    const user= JSON.parse(localStorage.getItem('user'))
     const cm={
      title:c.title,
      status:c.status,
      body:c.body,
      user:user.id,
      reason:''
    } 
 
 //console.log(JSON.stringify(cm))
 if(!this.contentForm.valid){
  return false;
 } else if(this.id!=undefined){
    if(window.confirm('Are you sure?')){
      this.authService.editContent(this.id,JSON.stringify(cm)).subscribe(res=>{
        console.log(res)
        this.router.navigateByUrl('/users/dashboard')
      });
    }
 } else {
    this.authService.createContent(JSON.stringify(cm)).subscribe(res =>{
    //console.log(res)
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
