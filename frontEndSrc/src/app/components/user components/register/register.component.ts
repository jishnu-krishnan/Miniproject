import { Component, OnInit, NgZone } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  mail: String;
  password: String;

  constructor(
    private validateService : ValidateService, 
    private authService : AuthService,
    private router :Router,
    private ngZone : NgZone
    ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
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
}
