import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: '',component:LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'add-user',component:AddUserComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    CommonModule
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
