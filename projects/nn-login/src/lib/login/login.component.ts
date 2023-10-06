import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() DB_URL = "";           //values assigned from the implementing project
  @Input() routePath = "";

  @ViewChild('myInput') myInput: ElementRef | undefined;

  loginForm!: FormGroup;
  showforgotpwd: boolean = true;
  errorMssg: any;
  heading = "Log In";
  verifiedEmail: any;
  loading:boolean=false;
  resetCode: any;
  resetPassword: any;
  confirmResetPassword: any;

  //screens
  forgotpwd: boolean = false;   //second screen
  verifyCode: boolean = false;  //third screen
  resetPwd: boolean = false;     //fourth screen


  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';


  // userSession: any;
  // confirmPassword: any;
  // invalidInputFields:any = [];

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {

  }


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    if (!this.DB_URL) {
      this.showforgotpwd = false;
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
    this.errorMssg = "";
    if (!this.forgotpwd) {
      if (this.loginForm.valid) {
        if (this.DB_URL) {
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
        this.loading=true;
        this.loginService.login(body).subscribe((res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('email', res.email);
            this.router.navigateByUrl(this.routePath);
            this.loading=false;
          
        }, (error: any) => {
          if (error.status === 401) {
            this.errorMssg = error.error.mssg;
          }
        }).add(()=>{
          this.loading=false;
        })
      } 
    } else {
      if (this.loginForm.get('email')?.valid) {
        if (!emailRegex.test(this.loginForm.value.email)) {
          this.errorMssg = "Please enter a valid Email Id!";
          return;
        }
        let body = {
          DB_URL: this.DB_URL,
          email: this.loginForm.value.email
        }
        this.loading=true;
        this.loginService.generateCode(body).subscribe((res: any) => {
          if (res) {
            localStorage.setItem('email', body.email);
            this.verifiedEmail = body.email;
            this.verifyCode = true;
            setTimeout(() => {
              this.myInput?.nativeElement.focus();
            });
            this.otp1 = "";
            this.otp2 = "";
            this.otp3 = "";
            this.otp4 = "";
            this.heading = "Verification Code"
          }
        }, (error: any) => {
          if (error.status === 401) {
            this.errorMssg = error.error.mssg;
          }
        })
        .add(()=>{
          this.loading=false;
        })
      }
    }
  }


  forgotPassword() {
    this.loginForm.reset();
    this.showforgotpwd = false;
    this.forgotpwd = true;
    this.heading = "Trouble with logging in?";

  }

  codeVerify() {
    this.loginForm.reset();
    this.errorMssg = "";
    const otp = this.otp1 + this.otp2 + this.otp3 + this.otp4;
    if (otp.length == 4) {
      let body = {
        DB_URL: this.DB_URL,
        code: otp,
        email: localStorage.getItem('email')
      }
      this.loading=true;
      this.loginService.verifyCode(body).subscribe((res: any) => {
        this.loading=false;
        if (res) {
          this.resetPwd = true;
          this.verifyCode = false;
          this.heading = "Set New Password"
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
      }).add(()=>{
        this.loading=false;
      })
    } else {
      this.errorMssg = "Invalid verification code!"
    }
  }

  changePwd() {
    this.errorMssg = "";
    if (this.resetPassword === this.confirmResetPassword) {
      let body = {
        DB_URL: this.DB_URL,
        password: this.resetPassword,
        email: localStorage.getItem('email')
      }
      this.loading=true;
      this.loginService.resetPwd(body).subscribe((res: any) => {
        if (res) {
          this.forgotpwd = false;
          this.verifyCode = false;
          this.resetPwd = false;
          this.showforgotpwd = true;
          this.heading = "Log In"
        }
      },(error: any) => {
        if (error.status === 404) {
          this.errorMssg = error.error.mssg;
          return;
        }
      }).add(()=>{
        this.loading=false;
      })
    }
  }

  validate() {
    this.errorMssg = (this.resetPassword != this.confirmResetPassword) ? "Password's do not match!" : ""
  }

  onOtpInputChange(event: any, index: number) {
    const inputValue = event.target.value;
    if (event.keyCode === 8 && inputValue === "") {
      if (index > 1) {
        const previousInputId = `otp${index - 1}`;
        document.getElementById(previousInputId)?.focus();
      }
    } else {
      if (index < 4 && inputValue !== "") {
        const nextInputId = `otp${index + 1}`;
        document.getElementById(nextInputId)?.focus();
      }
    }

  }

  backToMain() {
    this.loginForm.reset();
    this.forgotpwd = false;
    this.verifyCode = false;
    this.resetPwd = false;
    this.showforgotpwd = true;
    this.heading = "Log In"
  }
}
