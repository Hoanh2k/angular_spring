import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../dtos/user/login.dto'
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: String ='1987654321';
  password: String='123456' ;

  onPhoneNumberChange(){
    console.log(`Phone typed: ${this.phoneNumber}`)
    //how to validate ? phone must be at least 6 characters
  }
  constructor( private router: Router,private userService:UserService) {}
  login(){
    const message = 
    `phone: ${this.phoneNumber}`+
    `password: ${this.password}`;


    const loginDTO:LoginDTO={
   
      "phone_number":this.phoneNumber,

      "password":this.password
      }

      this.userService.login(loginDTO).subscribe({
        next: (response: any) =>{
          debugger
          if(response && (response.status==200 || response.status== 201)){
            // this.router.navigate(['/login']);
            debugger
          }else{
            // xu ly k thanh cong
          }
        },
        complete: ()=>{
          debugger
        },
        error: (error: any)=>{
          alert(`Khong the dang nhap: ${error.error} `)
         
          
        }
        
      });
      
  }
}
