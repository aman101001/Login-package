import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  addUser(data: any) {
    return this.http.post('http://localhost:8091/' + 'addUser', data); //should provide the path of server
  }

  removeUser(data: any) {
    return this.http.post('http://localhost:8091/' + 'removeUser', data); //should provide the path of server
  }
}
