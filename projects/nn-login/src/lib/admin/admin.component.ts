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
  @Input() DB_URL = "";       //values assigned from the implementing project
  @Input() routePath = "";

  adminForm!: FormGroup;
  errorMssg: any;
  heading: any = "Add";
  confirmPassword: any;
  confirmEmail: any;
  loading:boolean=false;

  removeuser: boolean = false;  //To display Delete user screen
  // userSession: any;
  // invalidInputFields: any = [];

  constructor(private adminService: AdminService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.adminForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  addUser() {
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    var body = {};
    this.errorMssg = "";

    if (!this.removeuser) {
      if (this.DB_URL && this.adminForm.valid) {
        if (!emailRegex.test(this.adminForm.value.email)) {
          this.errorMssg = "Please enter a valid Email Id!";
          return;
        }
        if (this.adminForm.value.password === this.confirmPassword) {
          body = {
            email: this.adminForm.value.email,
            password: this.adminForm.value.password,
            DB_URL: this.DB_URL
          };
          this.loading=true;
          this.adminService.addUser(body).subscribe((res: any) => {
            alert("User added successfully!!")
            this.router.navigateByUrl(this.routePath);
          }, (error: any) => {
            if (error.status === 404 || error.status === 409) {
              this.errorMssg = error.error.mssg;
            }
          }).add(()=>{
            this.loading=false;
          })
        }
      }
    } else {
      if (this.DB_URL && this.adminForm.get('email')?.valid) {
        if (!emailRegex.test(this.adminForm.value.email)) {
          this.errorMssg = "Please enter a valid Email Id!";
          return;
        }
        if (this.adminForm.value.email === this.confirmEmail) {
          body = {
            email: this.adminForm.value.email,
            DB_URL: this.DB_URL
          };
          if (confirm("User details will be deleted. Are you sure ?")) {
            this.loading=true;
            this.adminService.removeUser(body).subscribe((res: any) => {
              alert("User removed successfully!!")
              this.router.navigateByUrl(this.routePath);
            }, (error: any) => {
              if (error.status === 401) {
                this.errorMssg = error.error.mssg;
              }
            }).add(()=>{
              this.loading=false;
            })
          }
        }
      }
    }
  }
  // else {
  // for (let controlName in this.adminForm.controls) {
  //   const control = this.adminForm.get(controlName);
  //     if (control?.invalid) {
  //       this.invalidInputFields.push(control);
  //     }
  //   }
  // }

  validate(type: any) {
    if (type == 1) {
      this.errorMssg = (this.adminForm.value.password != this.confirmPassword) ? "Password's do not match!" : ""
    } else {
      this.errorMssg = (this.adminForm.value.email != this.confirmEmail) ? "Email do not match!" : "";
    }
  }

  removeUser() {               //Toggle to Delete user screen
    this.removeuser = true;
    this.adminForm.reset();
    this.heading = "Delete"
  }

  backToMain() {              //Toggle to Add user screen
    this.removeuser = false;
    this.heading = "Add"
  }
}
