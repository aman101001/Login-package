import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(data:any){
    return this.http.post('', data);
    // this.http.post('https://blogtesting.99games.in'+ 'login', data);
  }
}
