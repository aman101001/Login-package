import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NnLoginModule } from 'nn-login';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    NnLoginModule,
    ReactiveFormsModule,
    AppRoutingModule,

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
