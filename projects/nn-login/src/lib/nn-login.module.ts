import { NgModule } from '@angular/core';
import { NnLoginComponent } from './nn-login.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    NnLoginComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    BrowserModule
  
  ],
  exports: [
    NnLoginComponent,
    LoginComponent
  ]
})
export class NnLoginModule { }
