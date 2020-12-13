import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentComponent implements OnInit {

  id: String;
  content: any=[];
  comment:any=[];
  commentform: FormGroup;
  submitted=false;

  constructor(
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder
  ) { this.mainForm(); }

  mainForm(){
    this.commentform = this.fb.group({
      comment:['',[Validators.required]]
    })
  }

  get myForm(){
    return this.commentform.controls;
  } 

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if(this.id!=undefined){
      this.authService.showContentByid(this.id).subscribe(res=>{
        //console.log(res)
        this.content=res
        
      },(error)=>{
        console.log(error)
      });

      this.authService.showComment(this.id).subscribe(res=>{
        //console.log(res)
        this.comment=res
      },(error)=>{
        console.log(error)
      })

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

  onSubmit(cid){
    this.submitted=true;
    const c= this.commentform.value
    const user= JSON.parse(localStorage.getItem('user'))
    const cmd={
      comment:c.comment,
      user:user.id,
      content:cid
    } 

    if(!this.commentform.valid){
      return false;
    } else {
      this.authService.addComment(JSON.stringify(cmd)).subscribe(res=>{
        if(res.success){
          console.log("commented")
          this.ngOnInit()
          //this.router.navigateByUrl('/users/discover')
        } else {
          console.log("something wrong")
        }
      })
    }
  }

}
