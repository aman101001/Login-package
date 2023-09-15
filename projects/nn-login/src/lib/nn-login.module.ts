import { NgModule } from '@angular/core';
import { NnLoginComponent } from './nn-login.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NnLoginComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  
  ],
  exports: [
    NnLoginComponent,
    LoginComponent
  ]
})
export class NnLoginModule { }
