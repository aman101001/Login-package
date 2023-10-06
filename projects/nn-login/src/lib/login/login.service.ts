import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferService } from '../transfer.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  server = this.transferService.currentserver();
  ser:any;
  conn:any;

  constructor(private http: HttpClient,private transferService:TransferService) {
    this.transferService.setserver(this.server);
    this.ser = this.transferService.getServer();
    this.conn = this.ser.DOMAIN + this.ser.SERVERPORT;
   }

  login(data:any){
    return this.http.post(this.conn+ '/loginbackend/login', data); //should provide the path of server
  }

  generateCode(data:any){
    return this.http.post(this.conn+ '/loginbackend/login/generate-code', data);
  }

  verifyCode(data:any){
    return this.http.post(this.conn+ '/loginbackend/login/verify-code', data);
  }

  resetPwd(data:any){
    return this.http.put(this.conn+ '/loginbackend/login/reset-pwd', data);
  }

  // getUserDetails(sessId:any) {
  //   return this.http.get('http://staging.99games.mobi:8089/api/users/session/' + sessId)
  // }

  // generateToken() {
  //   return this.http.get('http://localhost:8080/' + 'authenticate');
  // }
}
