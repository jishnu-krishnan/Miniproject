import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
export interface DialogData {
  reason: string;
  
}

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})


export class AdminViewComponent implements OnInit {

  id: String;
  content: any=[];
  reason: String;
  data : any
  constructor(
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
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
      this.authService.showBookmarkByid(this.id).subscribe(res=>{
        console.log(res)
        this.content=res
        
      },(error)=>{
        console.log(error)
      });
    }
  }

 /*  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '250px',
      data: { reason: this.reason}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reason = result;
    });
  } */

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
        })
      });
  }

  /* onReject(id){
    if(window.confirm('Are you sure?')){
      
      const up={
        status:'private',
        reason:'already published'

      }
      this.authService.rejectRequest(id,JSON.stringify(up)).subscribe(res => {
        this.router.navigateByUrl('/admin/request')
      })
    }
  }
 */
  onApprove(id){
    const up={
      status:'public'
    }
    this.authService.approveRequest(id,JSON.stringify(up)).subscribe(res => {
      this.router.navigateByUrl('/admin/request')
    })
  }

}

/* @Component({
  selector: 'diaBox',
  templateUrl: './dialog_box.html',
})
export class dialogBox {

  constructor(
    public dialogRef: MatDialogRef<dialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

} */