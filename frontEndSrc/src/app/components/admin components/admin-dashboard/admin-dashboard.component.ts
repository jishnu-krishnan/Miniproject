import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface DialogData {
  reason: string;
  searchText:String;
}

/* @Pipe({
  name:'stiphtml'
}) */

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

/* export class StripHtmlPipe implements PipeTransform {
  transform(value: string): any {
      return value.replace(/<.*?>/g, ''); // replace tags
  }
} */

export class AdminDashboardComponent implements OnInit {
  keyword:String;
  bookmark: any=[];
  content : any=[];
  type: String;
  profile :String;
  reason:String;
  data : any
  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
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
      this.type='Bookmark'
      console.log(res)
    },(error)=> {
      console.log(error)
    });
     
     /* this.authService.showPublicContent().subscribe(res => {
      this.content=res
      },(error)=>{
      console.log(error)
      }) */
  }

  onBookmark(){
    //const user= JSON.parse(localStorage.getItem('user'))

    this.authService.showPublicDashboard().subscribe(res => {
      //console.log(res)
      this.bookmark=res
      this.type='Bookmark'
      //console.log(this.bookmark)
    },(error)=> {
      console.log(error)
    });
    //this.ngOnInit()
  }


  onContent(){
    //const user= JSON.parse(localStorage.getItem('user'))

    this.authService.showPublicContent().subscribe(res =>{
      console.log(res)
      this.bookmark=res
      this.type='Contents'

    },(error)=>{
      console.log(error)
    });
  }

 /*  onDeleteBookmark(id){
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
  } */

  onDeleteContent(id):void{
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '250px',
      data: { reason: this.reason}
      //console.log('The dialog was closed');
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      this.reason = result;
      console.log(this.reason)
      const up={
        status:'private',
        reason:this.reason
  
      }
      this.authService.rejectRequest(id,JSON.stringify(up)).subscribe(res => {
        this.ngOnInit()
        this.router.navigateByUrl('/admin/dashboard')

      });
    
    });
  }
}
