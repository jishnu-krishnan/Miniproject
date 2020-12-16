import { Component, OnInit } from '@angular/core';
import { FlashMessagesComponent,FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../services/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user= localStorage.getItem('user')
 //console.log(user)
     if(user!=null){
    this.router.navigateByUrl('/users/dashboard')
    } 
  }


}
