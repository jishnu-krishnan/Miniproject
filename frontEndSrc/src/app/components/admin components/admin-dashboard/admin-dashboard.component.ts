import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  bookmark: any=[];
  content : any=[];
  profile :String;
  constructor(
    private router: Router,
    private authService: AuthService) { }

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


  onDeleteBookmark(id){
    if(window.confirm('Are you sure?')){
      const up={
        status:'private',
        reason:'already published'

      }
      this.authService.rejectRequest(id,JSON.stringify(up)).subscribe(res => {
        console.log(res)
        this.router.navigateByUrl('/admin/dashboard')
      })
    }
  }

  onDeleteContent(id){
    if(window.confirm('Are you sure?')){
      const up={
        status:'private',
        reason:'already published'
  
      }
      this.authService.rejectRequest(id,JSON.stringify(up)).subscribe(res => {
        this.router.navigateByUrl('/admin/dashboard')
      });
    }
  }

}
