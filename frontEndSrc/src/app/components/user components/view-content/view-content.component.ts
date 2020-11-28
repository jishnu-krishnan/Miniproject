import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentComponent implements OnInit {

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

  onRequest(id){
    if(window.confirm('Are you Sure?')){
      const up={
        status:'pending'
      }
      this.authService.requestPublish(id,JSON.stringify(up)).subscribe(res =>{
        console.log(res)
        this.router.navigateByUrl('/users/dashboard')
      });
    }
  }

}
