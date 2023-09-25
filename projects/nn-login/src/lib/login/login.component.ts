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

  otp1:string='';
  otp2:string='';
  otp3:string='';
  otp4:string='';


  loginForm!: FormGroup;
  // userSession: any;
  // confirmPassword: any;
  // invalidInputFields:any = [];
  showforgotpwd: boolean = true;
  errorMssg:any;
  heading="Log In";
  verifiedEmail:any;

  //screens
  forgotpwd: boolean = false;
  verifyCode: boolean = false;
  resetPwd:boolean = false;

  resetCode:any;
  resetPassword:any;
  confirmResetPassword:any;
 
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
    if(!this.forgotpwd){
      if (this.loginForm.valid) {
        if(this.DB_URL){
          if (!emailRegex.test(this.loginForm.value.email)) {
            this.errorMssg = "Please enter a valid Email Id!";
            return;
          }
        }
        let body = {
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
    if(this.loginForm.get('email')?.valid){
        if (!emailRegex.test(this.loginForm.value.email)) {
          this.errorMssg = "Please enter a valid Email Id!";
          return;
        }
      let body={
        DB_URL:this.DB_URL,
        email: this.loginForm.value.email
       }
           this.loginService.reset(body).subscribe((res:any)=>{
             if(res){
               localStorage.setItem('email',body.email);
               this.verifiedEmail=body.email;
               this.verifyCode=true;
               this.heading="Verification Code"
             }
           },(error: any) => {
            if (error.status === 401) {
              this.errorMssg = error.error.mssg;
              return;
            }
          })
     }
    }
    
  }


forgotPassword(){
  this.loginForm.reset();
  this.showforgotpwd=false;
  this.forgotpwd=true;
  this.heading="Trouble with logging in?";

}

codeVerify(){
  this.loginForm.reset();
  this.errorMssg="";
  const otp=this.otp1+this.otp2+this.otp3+this.otp4;
  console.log(otp.length);
  if(otp.length==4){
    let body = {
      DB_URL:this.DB_URL,
      code: otp,
      email: localStorage.getItem('email')
    }
    this.loginService.verifyCode(body).subscribe((res:any)=>{
       if(res){
        this.resetPwd=true;
        this.verifyCode=false;
        this.heading="Set New Password"
       }
    }, (error: any) => {
      if (error.status === 400) {
        this.errorMssg = error.error.mssg;
        return;
      }
      if (error.status === 401) {
        this.errorMssg = error.error.mssg;
        return;
      }
    })
  } else {
    this.errorMssg = "Invalid verification code!"
  }
  

  
}

changePwd(){
  this.errorMssg="";
  if (this.resetPassword === this.confirmResetPassword){
    let body={
      DB_URL:this.DB_URL,
      password: this.resetPassword,
      email: localStorage.getItem('email')
    }
    this.loginService.resetPwd(body).subscribe((res:any)=>{
      if(res){
        this.forgotpwd=false;
        this.verifyCode=false;
        this.resetPwd=false;
        this.showforgotpwd=true;
        this.heading="Log In"
      }
   })
  }
}

validate(){
    this.errorMssg = (this.resetPassword != this.confirmResetPassword) ? "Password's do not match!" : ""
}

onOtpInputChange(event:any,index:number){
  const inputValue=event.target.value;
  console.log(event);
  console.log(event.keyCode);
  if(event.keyCode===8 && inputValue===''){
    if(index>1){
      const previousInputId=`otp${index-1}`;
      document.getElementById(previousInputId)?.focus();
    }
  } else {
    if(index<4 && inputValue!== ''){
      const nextInputId = `otp${index+1}`;
      document.getElementById(nextInputId)?.focus();
    }
  } 
  
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
