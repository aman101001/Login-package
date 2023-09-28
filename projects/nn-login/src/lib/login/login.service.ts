import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient) { }
  login(data:any){
    return this.http.post('http://localhost:8091/'+ 'login', data); //should provide the path of server
  }

  generateCode(data:any){
    return this.http.post('http://localhost:8091/'+ 'generateCode', data);
  }

  verifyCode(data:any){
    return this.http.post('http://localhost:8091/'+ 'verifyCode', data);
  }

  resetPwd(data:any){
    return this.http.post('http://localhost:8091/'+ 'resetPwd', data);
  }

  // getUserDetails(sessId:any) {
  //   return this.http.get('http://staging.99games.mobi:8089/api/users/session/' + sessId)
  // }

  // generateToken() {
  //   return this.http.get('http://localhost:8080/' + 'authenticate');
  // }
}
