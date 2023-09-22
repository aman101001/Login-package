import { NgModule } from '@angular/core';
import { NnLoginComponent } from './nn-login.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    NnLoginComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,


  ],
  exports: [
    NnLoginComponent,
    LoginComponent,
    AdminComponent
  ]
})
export class NnLoginModule { }
