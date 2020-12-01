import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-discover-page',
  templateUrl: './discover-page.component.html',
  styleUrls: ['./discover-page.component.css']
})
export class DiscoverPageComponent implements OnInit {
  content : any=[];
  bookmark : any=[];
  profile :String;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    const user= JSON.parse(localStorage.getItem('user'))

     this.authService.getProfile(user.id).subscribe(res =>{
      //console.log(res.name) 
      this.profile=res.name
      // console.log(res.name)
     },(error)=>{
       console.log(error)
     });

     this.authService.showPublicDashboard().subscribe(res => {
      this.bookmark=res
      
      //console.log(this.bookmark)
    },(error)=> {
      console.log(error)
    });
     
     
     this.authService.showPublicContent().subscribe(res => {
      this.content=res
      },(error)=>{
      console.log(error)
      })
   }

}
  