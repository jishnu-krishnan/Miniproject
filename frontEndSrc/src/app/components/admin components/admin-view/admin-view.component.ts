import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

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

  onReject(id){
    const up={
      status:'private',
      reason:'already published'

    }
    this.authService.rejectRequest(id,JSON.stringify(up)).subscribe(res => {
      this.router.navigateByUrl('/admin/request')
    })
  }

  onApprove(id){
    const up={
      status:'public'
    }
    this.authService.approveRequest(id,JSON.stringify(up)).subscribe(res => {
      this.router.navigateByUrl('/admin/request')
    })
  }

}
