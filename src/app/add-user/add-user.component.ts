import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  DB_USER_TEST = 'admin';
  PASSWORD_TEST = encodeURIComponent('stageR0b0#');
  DB_URL=`mongodb://${this.DB_USER_TEST}:${this.PASSWORD_TEST}@localhost:19500/login?authSource=admin`;
}
