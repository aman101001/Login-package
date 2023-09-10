import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray ,FormBuilder} from '@angular/forms';
import { LoginService
 } from './login.service';
@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  errmssg:Boolean = false;
  @Input() data:any;
  constructor(private loginService: LoginService, private fb: FormBuilder){
 
  }
  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }
  onSubmit(){
    
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let email = this.myForm.value.email;
    if (emailRegex.test(email)) {
      let data={
        email : this.myForm.value.email,
        password : this.myForm.value.password,
        DB_URL : this.data
      };
        this.loginService.login( data ).subscribe((msg)=>{
           console.log(msg);
        })
    } else {
      // Invalid email
      this.errmssg = true;
    }
  }
}
