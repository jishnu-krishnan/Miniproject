import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
bookmark :any=[];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
    const user= JSON.parse(localStorage.getItem('user'))
     this.authService.showDashboard(user.id).subscribe(res => {
      console.log(res)
      this.bookmark=res
      //console.log(this.bookmark)
    },(error)=> {
      console.log(error)
    });
}
}
