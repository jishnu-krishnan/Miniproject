import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";


@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.css']
})
export class UserContentComponent implements OnInit {

  id: String;
  content : any=[];
  bookmark : any=[];
  type:String;
  profile :String;
  searchText:String;
  limit:Number;
  temp:Number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.limit=9
    
    this.id = this.route.snapshot.params['id']
    this.authService.showUserContent(this.id).subscribe(res => {
      this.bookmark=res
      //console.log(res)
      this.type='Contents'
      this.temp=res.length
      },(error)=>{
      console.log(error)
      })

  }

  onContent(){
    this.id = this.route.snapshot.params['id']
    this.authService.showUserContent(this.id).subscribe(res => {
      this.bookmark=res
      //console.log(res)
      this.type='Contents'
      this.temp=res.length
      },(error)=>{
      console.log(error)
      })
  }
  
  onBookmark(){
    this.id = this.route.snapshot.params['id']
    this.authService.showUserBookmark(this.id).subscribe(res => {
      this.bookmark=res
      //console.log(res)
      this.type='Bookmark'
      this.temp=res.length
      },(error)=>{
      console.log(error)
      })
  }

  showMore(){
    this.limit=this.temp;
    //this.style.visibility= 'hidden';
    
  }

}
