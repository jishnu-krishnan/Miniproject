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

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.authService.showUserContent(this.id).subscribe(res => {
      this.bookmark=res
      console.log(res)
      this.type='Contents'
      },(error)=>{
      console.log(error)
      })

  }

  onContent(){
    this.id = this.route.snapshot.params['id']
    this.authService.showUserContent(this.id).subscribe(res => {
      this.bookmark=res
      console.log(res)
      this.type='Contents'
      },(error)=>{
      console.log(error)
      })
  }
  
  onBookmark(){
    this.id = this.route.snapshot.params['id']
    this.authService.showUserBookmark(this.id).subscribe(res => {
      this.bookmark=res
      console.log(res)
      this.type='Contents'
      },(error)=>{
      console.log(error)
      })
  }

}
