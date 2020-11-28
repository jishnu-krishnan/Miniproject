import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  oldPassword: String;
  newPassword: String;
  confirmPassword: String;

  submitted= false;
  changePasswordForm:FormGroup;
  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { this.mainForm(); }

  ngOnInit(): void {
  }

  mainForm(){
    this.changePasswordForm = this.fb.group({
      oldPassword: ['',[Validators.required]],
      newPassword: ['',[Validators.required]],
      confirmPassword: ['',[Validators.required]]
    })
  }

  get myForm(){
    return this.changePasswordForm.controls;
  }

  onSubmit(){
    this.submitted=true;
    const val=this.changePasswordForm.value;
    const cp={
      oldPassword:val.oldPassword,
      newPassword:val.newPassword,
      confirmPassword:val.confirmPassword
    }
    if(cp.newPassword!=cp.confirmPassword){
      if(window.confirm('Please check new Password')){
        console.log('hjnkm')
      }
    }else{
      console.log(JSON.stringify(cp))
    }

  }
}
