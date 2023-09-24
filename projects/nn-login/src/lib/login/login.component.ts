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

  


  loginForm!: FormGroup;
  // userSession: any;
  // confirmPassword: any;
  // invalidInputFields:any = [];
  forgotpwd: boolean = false;
  showforgotpwd: boolean = true;
  errorMssg:any;
 
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
       
  }
  ngOnInit() { 

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    if(!this.DB_URL){
      this.showforgotpwd=false ;
    }
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
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    this.errorMssg="";
    var body = {};
    if(!this.forgotpwd){
      if (this.loginForm.valid) {
        if(this.DB_URL){
          if (!emailRegex.test(this.loginForm.value.email)) {
            this.errorMssg = "Please enter a valid Email Id!";
            return;
          }
        }
        body = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
          DB_URL: this.DB_URL
        };
        this.loginService.login(body).subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('email', res.email);
          this.router.navigateByUrl(this.routePath);
        }, (error: any) => {
          if (error.status === 401) {
            this.errorMssg = error.error.mssg;
          }
        })
      } else {
        // for (let controlName in this.loginForm.controls) {
        // const control = this.loginForm.get(controlName);
        //   if (control?.invalid) {
        //     this.invalidInputFields.push(control);
        //   }
        // }
      }
    } else {
      body={
       DB_URL:this.DB_URL,
       email: this.loginForm.value.email
      }
          this.loginService.reset(body).subscribe(()=>{
            
          })
    }
    
  }


forgotPassword(){
  this.showforgotpwd=false;
  this.forgotpwd=true;

}
  // addUser() { 
  //   var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; 
  //   this.passwordsuccessful = true;
  //   this.emailsuccessful = true;
  //   var body = {};
  //   if(this.DB_URL && this.loginForm.valid){
  //     if (!emailRegex.test(this.loginForm.value.email)){
  //        this.emailsuccessful = false;
  //        return;
  //     }
  //       if(this.loginForm.value.password === this.confirmPassword){
  //       body = {
  //         email: this.loginForm.value.email,
  //         password: this.loginForm.value.password,
  //         DB_URL: this.DB_URL
  //       };
  //       this.loginService.addUser(body).subscribe((res: any) => {
  //         alert("User added successfully!!")
  //         this.router.navigateByUrl(this.routePath);
  //       }, (error: any) => {
  //         if (error.status === 404) {
  //           this.loginsuccessful = false;
  //         }
  //       })
  //     } else {
  //       this.passwordsuccessful=false;
  //     }
  //   } else {
  //     // for (let controlName in this.loginForm.controls) {
  //     //   const control = this.loginForm.get(controlName);
  //     //     if (control?.invalid) {
  //     //       this.invalidInputFields.push(control);
  //     //     }
  //     //   }
    
  //   }

  // }

  // validatePassword() {
  //   this.passwordsuccessful = (this.loginForm.value.password != this.confirmPassword) ? false : true;
  // }

}
