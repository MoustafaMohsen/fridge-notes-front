import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { ErrorInterceptor } from './_interceptors/error.interceptor';
import {  JwtInterceptor} from './_interceptors/jwt.interceptor';
import { AuthGuard} from './_guards/auth.guard';
import { CommonModule } from '@angular/common';
import { Bug200ok } from './_interceptors/bug.200ok.interpector';
//import {  AlertService } from './_services/alert.service';
//import {  AuthenticationService } from './_services/authentication.service';
//import {  UserService } from './_services/user.service';




@NgModule({
  imports: [ CommonModule],
  providers: [
    AuthGuard,
    //AlertService,
    //AuthenticationService,
    //UserService,
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    //{provide:HTTP_INTERCEPTORS,useClass:Bug200ok,multi:true},

  ]
})
export class MyAuthModule { }
