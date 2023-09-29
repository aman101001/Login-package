import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferService } from '../transfer.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  server = this.transferService.currentserver();
  ser:any;
  conn:any;

  constructor(private http: HttpClient,private transferService:TransferService) { 
    this.transferService.setserver(this.server);
    this.ser = this.transferService.getServer();
    this.conn = this.ser.DOMAIN + this.ser.SERVERPORT;
  }


  addUser(data: any) {
    return this.http.post(this.conn + '/loginbackend/addUser', data); //should provide the path of server
  }

  removeUser(data: any) {
    return this.http.post(this.conn  + '/loginbackend/removeUser', data); //should provide the path of server
  }
}
