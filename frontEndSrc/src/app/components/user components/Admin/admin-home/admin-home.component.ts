import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  submitted = false;
  catogoryform : FormGroup;


  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
  ) { this.mainForm(); }

  mainForm(){
    this.catogoryform = this.fb.group({
      catogory: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  get myForm(){
    return this.catogoryform.controls;
  } 

  onSubmit(){
    this.submitted= true;
    const c= this.catogoryform.value
    const Admin= JSON.parse(localStorage.getItem('admin'))
     const cm={
      catogory:c.catogory,
      user:Admin.id
    }
    
    
    if(!this.catogoryform.valid){
      return false;
     } else {
        this.authService.createCatogory(JSON.stringify(cm)).subscribe(res =>{
        console.log(res)
        if(res.success){
            console.log('catogory added succesfully');
            this.router.navigateByUrl('/admin-home/add')
        } else {
            console.log('Somethings wrong');
            this.router.navigateByUrl('/admin-home/add')
        }
       },(error)=> {
         console.log(error)
       });
      }
  }

}
