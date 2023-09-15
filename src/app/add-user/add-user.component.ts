import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  config ={
    DB_URL: "mongodb://localhost:27017/login",
    routePath: "/",
    type:{
      login : false,
      addUser :true
    }
  }
}
