import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  @Input() DB_URL = "";
  @Input() routePath = "";
  // @Input() login=false;
  // @Input() manageUser=false;

  loginForm!: FormGroup;

  confirmPassword: any;
  confirmEmail: any;
    // userSession: any;
  // invalidInputFields: any = [];

  removeuser: boolean = false;
  errorMssg: any;
  heading: any = "Add";

  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  addUser() {
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    var body = {};
    this.errorMssg="";

    if (!this.removeuser) {
      if (this.DB_URL && this.loginForm.valid) {
        if (!emailRegex.test(this.loginForm.value.email)) {
          this.errorMssg = "Please enter a valid Email Id!";
          return;
        }
        if (this.loginForm.value.password === this.confirmPassword) {
          body = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
            DB_URL: this.DB_URL
          };
          this.adminService.addUser(body).subscribe((res: any) => {
            alert("User added successfully!!")
            this.router.navigateByUrl(this.routePath);
          }, (error: any) => {
            if (error.status === 404) {
              this.errorMssg = error.error.mssg;
            }
          })
        }
      }
    } else {
      if (this.DB_URL && this.loginForm.get('email')?.valid) {
        if (!emailRegex.test(this.loginForm.value.email)) {
          this.errorMssg = "Please enter a valid Email Id!";
          return;
        }
        if (this.loginForm.value.email === this.confirmEmail) {
          body = {
            email: this.loginForm.value.email,
            DB_URL: this.DB_URL
          };
          if (confirm("User details will be deleted. Are you sure ?")) {
            this.adminService.removeUser(body).subscribe((res: any) => {
              alert("User removed successfully!!")
              this.router.navigateByUrl(this.routePath);
            }, (error: any) => {
              if (error.status === 401) {
                this.errorMssg = error.error.mssg;
              }
            })
          }
        }
      }
    }
  }


  // else {

  // for (let controlName in this.loginForm.controls) {
  //   const control = this.loginForm.get(controlName);
  //     if (control?.invalid) {
  //       this.invalidInputFields.push(control);
  //     }
  //   }

  // }
  removeUser(){
    this.removeuser=true;
    this.loginForm.reset();
    this.heading="Delete"
  }


  validate(type:any){
    if(type==1){
      this.errorMssg = (this.loginForm.value.password != this.confirmPassword) ? "Password's do not match!" : ""
    } else {
      this.errorMssg = (this.loginForm.value.email != this.confirmEmail) ? "Email do not match!" : "";
    }
  }
}
