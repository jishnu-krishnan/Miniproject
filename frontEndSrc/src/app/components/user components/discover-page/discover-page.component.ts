import { BuiltinType } from '@angular/compiler';
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
  type:String;
  profile :String;
  searchText:String;
  limit:Number;
  temp:Number;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.limit=9
    const user= JSON.parse(localStorage.getItem('user'))

     this.authService.getProfile(user.id).subscribe(res =>{
      //console.log(res.name) 
      this.profile=res.name

      // console.log(res.name)
     },(error)=>{
       console.log(error)
     });

     /*  this.authService.showPublicDashboard().subscribe(res => {
      this.bookmark=res
      
      //console.log(this.bookmark)
    },(error)=> {
      console.log(error)
    });  */
     
     
     this.authService.showPublicContent().subscribe(res => {
      this.bookmark=res
      //console.log(res)
      this.type='Contents'
      this.temp=res.length
      //console.log(this.temp)
      },(error)=>{
      console.log(error)
      })
   }

   onBookmark(){
    //const user= JSON.parse(localStorage.getItem('user'))

    this.authService.showPublicDashboard().subscribe(res => {
      //console.log(res)
      this.bookmark=res
      this.type='Bookmark'
      this.temp=res.length
      //console.log(this.bookmark)
    },(error)=> {
      console.log(error)
    });
    //this.ngOnInit()
  }


  onContent(){
    //const user= JSON.parse(localStorage.getItem('user'))

    this.authService.showPublicContent().subscribe(res =>{
      //console.log(res)
      this.bookmark=res
      this.type='Contents'
      this.temp=res.length

    },(error)=>{
      console.log(error)
    });
  }
  showMore(){
    this.limit=this.temp;
    //this.style.visibility= 'hidden';
    
  }

}
  