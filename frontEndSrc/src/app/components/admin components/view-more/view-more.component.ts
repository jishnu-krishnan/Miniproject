import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {

  id: String;
  content: any=[];

  constructor(
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if(this.id!=undefined){
      this.authService.showContentByid(this.id).subscribe(res=>{
        console.log(res)
        this.content=res
        
      },(error)=>{
        console.log(error)
      });
    }
  }

}
