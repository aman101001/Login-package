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
  @Input() DB_URL="";
  @Input() routePath="";

  


  adminForm!: FormGroup;
  // userSession: any;
  confirmPassword: any;
  invalidInputFields:any = [];

  loginsuccessful: boolean = true;
  passwordsuccessful : boolean = true;
  emailsuccessful: boolean =true;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
       
  }
  ngOnInit() { 

    this.adminForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    // if (localStorage.getItem('sessionId')) {
    //   this.userSession = localStorage.getItem('sessionId');
    // }
    // if (this.userSession != 'null') {
    //   this.loginService.getUserDetails(this.userSession).subscribe((res: any) => {
    //     if (res) {
    //       localStorage.setItem('userId', res['session']['user']['details']['id']);
    //       // localStorage.setItem('login', 'Config')
    //       localStorage.setItem('userName', res['session']['username']);
    //       this.loginService.generateToken().subscribe((res: any) => {
    //         if (res) {
    //           localStorage.setItem('token', res.token);
    //           // this.router.navigateByUrl('/layout');
    //         }
    //       });
    //     }
    //   });
    // }
  }
  onSubmit() {
    this.loginsuccessful = true;
    var body = {};
    if (this.adminForm.valid) {
      body = {
        email: this.adminForm.value.email,
        password: this.adminForm.value.password,
        DB_URL: this.DB_URL
      };
      this.loginService.login(body).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
        this.router.navigateByUrl(this.routePath);
      }, (error: any) => {
        if (error.status === 401) {
          this.loginsuccessful = false;
        }
      })
    } else {
      // for (let controlName in this.adminForm.controls) {
      // const control = this.adminForm.get(controlName);
      //   if (control?.invalid) {
      //     this.invalidInputFields.push(control);
      //   }
      // }
    }
  }

  addUser() { 
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; 
    this.passwordsuccessful = true;
    this.emailsuccessful = true;
    var body = {};
    if(this.DB_URL && this.adminForm.valid){
      if (!emailRegex.test(this.adminForm.value.email)){
         this.emailsuccessful = false;
         return;
      }
        if(this.adminForm.value.password === this.confirmPassword){
        body = {
          email: this.adminForm.value.email,
          password: this.adminForm.value.password,
          DB_URL: this.DB_URL
        };
        this.loginService.addUser(body).subscribe((res: any) => {
          alert("User added successfully!!")
          this.router.navigateByUrl(this.routePath);
        }, (error: any) => {
          if (error.status === 404) {
            this.loginsuccessful = false;
          }
        })
      } else {
        this.passwordsuccessful=false;
      }
    } else {
      // for (let controlName in this.adminForm.controls) {
      //   const control = this.adminForm.get(controlName);
      //     if (control?.invalid) {
      //       this.invalidInputFields.push(control);
      //     }
      //   }
    
    }

  }

  validatePassword() {
    this.passwordsuccessful = (this.adminForm.value.password != this.confirmPassword) ? false : true;
  }

}
