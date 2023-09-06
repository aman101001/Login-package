import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray ,FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  myForm!: FormGroup;
  errmssg:Boolean = false;
  DB_URL:any="aman";
  constructor( private fb: FormBuilder){
 
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
        
    } else {
      // Invalid email
      this.errmssg = true;
    }
  }
}
