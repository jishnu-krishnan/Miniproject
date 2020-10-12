import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name== undefined || user.name==""){
      return false; 
    }else if(user.mail== undefined || user.mail==""){
      return false
    }else if(user.password== undefined || user.password==""){
      return false; 
    }else {
      return true;
    }
    
  }

  validateEmail(mail){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
    return re.test(String(mail).toLowerCase());
  }
    
}
