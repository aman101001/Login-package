import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  DB_URL= "mongodb://localhost:27017/login";
 
  
  constructor(){
 
  }
  ngOnInit() {
   
  }
 
}
