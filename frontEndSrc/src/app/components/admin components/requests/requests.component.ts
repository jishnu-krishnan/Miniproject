import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

export interface DialogData {
  reason: string;
  
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  reason:String;
  data : any
  content : any=[];
  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.authService.showRequest().subscribe(res => {
      //console.log(res)
      this.content=res
    },(error)=>{
      console.log(error)
    })
  }

  onApprove(id){
    const up={
      status:'public'
    }
    this.authService.approveRequest(id,JSON.stringify(up)).subscribe(res => {
      this.router.navigateByUrl('/admin/request')
      this.ngOnInit()
    })
  }

  onReject(id):void{
    //console.log('dsgsdgsdgd')
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '250px',
      data: { reason: this.reason}
      //console.log('The dialog was closed');
    });
      //this.authService.rejectRequest(id,JSON.stringify(data)).subscribe(res => {
        //this.router.navigateByUrl('/admin/request')
      //})
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
        this.reason = result;
        console.log(this.reason)
        const up={
          status:'private',
          reason:this.reason
  
        }
        this.authService.rejectRequest(id,JSON.stringify(up)).subscribe(res => {
          this.router.navigateByUrl('/admin/request')
          this.ngOnInit()
        })
      });
  }




}
