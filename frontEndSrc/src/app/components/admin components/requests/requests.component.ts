import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  content : any=[];
  constructor(
    private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    
    this.authService.showRequest().subscribe(res => {
      //console.log(res)
      this.content=res
    },(error)=>{
      console.log(error)
    })
  }

}
