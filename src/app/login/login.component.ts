import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  DB_USER_TEST = 'admin';
  PASSWORD_TEST = encodeURIComponent('stageR0b0#');
  DB_URL=`mongodb://${this.DB_USER_TEST}:${this.PASSWORD_TEST}@localhost:19500/login?authSource=admin`;//testing.99games.mobi
}
