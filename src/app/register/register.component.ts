import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from '../service/user.service';
import { RegisterDTO } from '../dtos/user/register.dto';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  // khai bao bien
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor( private router: Router,private userService:UserService) {
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  register(){
    const message = `phone: ${this.phoneNumber}`+
    `password: ${this.password}`+
    `retypePassword: ${this.retypePassword}`+
    `address: ${this.address}`+
    `fullName: ${this.fullName}`+
    `isAccepted: ${this.isAccepted}`+
    `dateOfBirth: ${this.dateOfBirth}`;
// alert(message); 
    // const apiUrl ="http://localhost:8088/api/v1/users/register";
    const registerDto:RegisterDTO={
      "fullname":this.fullName,
      "phone_number":this.phoneNumber,
      "address":this.address,
      "password":this.password,
      "retype_password":this.retypePassword,
      "date_of_birth":this.dateOfBirth,
      "facebook_account_id":0,
      "google_account_id":0,
      "role_id":1
      }

      this.userService.register(registerDto).subscribe({
        next: (response: any) =>{
          debugger
          if(response && (response.status==200 || response.status== 201)){
            this.router.navigate(['/login']);
          }else{
            // xu ly k thanh cong
          }
        },
        complete: ()=>{
          debugger
        },
        error: (error: any)=>{
          alert(`Khong the dang ky: ${error.error} `)
         
          
        }
        
      });
      
  }

  //how to check password match ?
  checkPasswordsMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword']
        .setErrors({ 'passwordMismatch': true });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  onPhoneNumberChange(){
    console.log(`Phone typed: ${this.phoneNumber}`)
    //how to validate ? phone must be at least 6 characters
  }
  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
