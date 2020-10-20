import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-guestnavbar',
  templateUrl: './guestnavbar.component.html',
  styleUrls: ['./guestnavbar.component.css']
})
export class GuestnavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success',
      timeout : 3000
    });
    this.router.navigateByUrl('/login');
    return false;
  }

}
