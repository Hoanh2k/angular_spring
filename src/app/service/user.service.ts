import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister =`${environment.apiBaseUrl}/users/register`;
  private apiLogin =`${environment.apiBaseUrl}/users/login`;
  private apiConfig={headers : this.createHeaders()};



  constructor(private http: HttpClient) {  }
  private createHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type':'application/json',
      'Accept-Language':'vi'
    });
  }

  register(registerDto: RegisterDTO):Observable<any>{
    // const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.apiRegister,registerDto,this.apiConfig)
  } 

  login(loginDTO:LoginDTO):Observable<any>{
    // const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.apiLogin,loginDTO,this.apiConfig)
  }

}
