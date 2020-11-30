import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm : FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) { 
    this.mainForm();
  }

  ngOnInit(): void {
    
  }

  mainForm(){
    this.loginForm = this.fb.group({
      mail: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['',[Validators.required]]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.loginForm.controls;
  }

  
  onLoginSubmit(){
    this.submitted =true;
    if(!this.loginForm.valid){
      return false;
    } else if(this.loginForm.value.mail=='admin@gmail.com'){
        console.log('admin login')
        this.authService.authenticateUser(JSON.stringify(this.loginForm.value)).subscribe(res =>{
          console.log(res)
          //console.log(res.user)
          if(res.success){
            console.log('logined')
  
            this.authService.storeUserToken(res.token, res.user);
            
            this.ngZone.run(() =>this.router.navigateByUrl('admin/request'))
          } else{
            this.flashMessages.show('Invalid username or password',{ cssClass:'alert-danger', timeout: '3000'});
            this.router.navigateByUrl('/login')
  
          }
        },(error)=> {
          console.log(error)
        });
    } else {
      this.authService.authenticateUser(JSON.stringify(this.loginForm.value)).subscribe(res =>{
        console.log(res)
        //console.log(res.user)
        if(res.success){
          console.log('logined')

          this.authService.storeUserToken(res.token, res.user);
          
          this.ngZone.run(() =>this.router.navigateByUrl('users/dashboard'))
        } else{
          this.flashMessages.show('Invalid username or password',{ cssClass:'alert-danger', timeout: '3000'});
          this.router.navigateByUrl('/login')

        }
      },(error)=> {
        console.log(error)
      });
    }
  }
}

