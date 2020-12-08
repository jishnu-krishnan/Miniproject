import { Component, Inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';
//import { DashboardComponent } from '../../user components/dashboard/dashboard.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-guestnavbar',
  templateUrl: './guestnavbar.component.html',
  styleUrls: ['./guestnavbar.component.css']
})
export class GuestnavbarComponent implements OnInit {
  bookmark :any=[];
  content : any=[];
  submitted= false;
  searchForm:FormGroup;
 /*  buttons = [];
  fabTogglerState = 'inactive';

  fabButtons = [
    {
      icon: 'mode_edit',
      class: 'btn-floating yellow',
      route: '/content/add'
    },
    {
      icon: 'bookmark',
      class: 'btn-floating red',
      route: '/bookmark/add'
    }
  ]; */
  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    public fb: FormBuilder,
  ) { this.mainForm(); }
  
  mainForm(){
    this.searchForm = this.fb.group({
      search: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    
  }
/* 
  onBookmark(){
    const user= JSON.parse(localStorage.getItem('user'))
    //this.dash.showBookmark(user.id)
  }

  onContent(){
    const user= JSON.parse(localStorage.getItem('user'))
    //this.dash.showContent(user.id)
  } */

  onLogoutClick(){
    if(window.confirm('Are you sure to exit?')){
      this.authService.logout();
      this.router.navigateByUrl('/login')
    }
  }

  /* showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab(){
    //console.log('hgjnk')
    this.buttons.length ? this.hideItems() : this.showItems();
  }
 */
  get myForm(){
    //this.title.setValue('jishnu')
    return this.searchForm.controls;
  }
  onSubmit(){
    //console.log('sfsdf')
    this.submitted=true;
    if(!this.searchForm.valid){
      return false
    }else{

    }
  }
}
