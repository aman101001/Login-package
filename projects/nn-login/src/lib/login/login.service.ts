import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(data:any){
    return this.http.post('http://localhost:8080/'+ 'login', data); //should provide the path of server
  }

  addUser(data:any){
      return this.http.post('http://localhost:8080/'+ 'addUser', data); //should provide the path of server
  }

  reset(data:any){
    return this.http.post('http://localhost:8080/'+ 'generateCode', data);
  }

  verifyCode(data:any){
    return this.http.post('http://localhost:8080/'+ 'verifyCode', data);
  }

  resetPwd(data:any){
    console.log('clicked');
    return this.http.post('http://localhost:8080/'+ 'resetPwd', data);
  }

  getUserDetails(sessId:any) {
    return this.http.get('http://staging.99games.mobi:8089/api/users/session/' + sessId)
  }

  generateToken() {
    return this.http.get('http://localhost:8080/' + 'authenticate');
  }
}
