import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginsuccessful: boolean = true;
  userSession: any;
  confirmPassword: any;
  passwordMssg: Boolean = false;
  @Input() data: any;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {

  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    });

    if (localStorage.getItem('sessionId')) {
      this.userSession = localStorage.getItem('sessionId');
    }
    if (this.userSession != 'null') {
      this.loginService.getUserDetails(this.userSession).subscribe((res: any) => {
        if (res) {
          localStorage.setItem('userId', res['session']['user']['details']['id']);
          // localStorage.setItem('login', 'Config')
          localStorage.setItem('userName', res['session']['username']);
          this.loginService.generateToken().subscribe((res: any) => {
            if (res) {
              localStorage.setItem('token', res.token);
              // this.router.navigateByUrl('/layout');
            }
          });
        }
      });
    }
  }
  onSubmit() {
    this.passwordMssg = false;
    this.loginsuccessful = true;
    var body = {};
    if(this.loginForm.valid){
    body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      DB_URL: this.data.DB_URL
    };
    this.loginService.login(body).subscribe((res: any) => {
      localStorage.setItem('token', res.token),
        localStorage.setItem('email', res.email)
      this.router.navigateByUrl(this.data.routePath);
    }, (error: any) => {
      if (error.status === 401) {
        this.loginsuccessful = false;
      }
    })
  }
  }

  addUser() {
    this.passwordMssg = false;
    this.loginsuccessful = true;
    var body = {};
    if(this.loginForm.valid && (this.loginForm.value.password === this.confirmPassword)){
      body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        DB_URL: this.data.DB_URL
      };
      this.loginService.addUser(body).subscribe((res: any) => {
        alert("User added successfully!!")
        this.router.navigateByUrl(this.data.routePath);
      }, (error: any) => {
        if (error.status === 404) {
          this.loginsuccessful = false;
        }
      })
    }
  }

  validatePassword() {
    this.passwordMssg=(this.loginForm.value.password != this.confirmPassword)?true:false;
  }
}
