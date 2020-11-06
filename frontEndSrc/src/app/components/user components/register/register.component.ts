import { Component, OnInit, NgZone } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  mail: String;
  password: String;
  submitted = false;
  userForm : FormGroup;

  constructor(
    public fb: FormBuilder,
    private validateService : ValidateService, 
    private authService : AuthService,
    private router :Router,
    private ngZone : NgZone,
    private flashMessages: FlashMessagesService

    ) {
      this.mainForm();
     }

  ngOnInit(): void {
  }


  mainForm(){
    this.userForm = this.fb.group({
      mail: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['',[Validators.required]],
      name:['',[Validators.required]]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.userForm.controls;
  }

  onRegisterSubmit(){
    this.submitted=true;
    if(!this.userForm.valid){
      return false;
    }else{
      this.authService.registerUser(JSON.stringify(this.userForm.value)).subscribe(res => {
        console.log(res)
        if(res.success){
          console.log('User Successfully Registered');
          this.router.navigateByUrl('/users/dashboard')
        }else{
          console.log('Somethings wrong');
          this.router.navigateByUrl('/register')
        }
      },(error)=> {
        console.log(error);
      });
    }
  }

  /*onRegisterSubmit(){
    const user={
      name: this.name,
      mail: this.mail,
      password: this.password
      
      
    }

     //Required fields
    if(!this.validateService.validateRegister(user)){
      console.log('Please fill all fields')
      return false;
    }

    //Email validation
    if(!this.validateService.validateEmail(user.mail)){
      console.log('Please fill valid email')
      return false;
    }
 
    // Register user
    this.authService.registerUser(user).subscribe(res =>{
        console.log('registered')
        console.log(user)
        this.ngZone.run(()=> this.router.navigateByUrl('/'))
      }, (error)=> {
        console.log(error)
      });
    }
  */
}
