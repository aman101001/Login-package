import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(data:any){
    console.log(data);
    return this.http.post('http://localhost:8080/'+ 'login', data);
  }
}
