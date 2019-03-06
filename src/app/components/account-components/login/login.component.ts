import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {AuthenticationService, AlertService, UserService} from '../../../_auth.collection';
import {UserDto} from '../../../_auth.collection';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
declare var $ :any;

import { StylerService } from 'src/app/Services/styler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy,AfterViewInit {


  loginform:FormGroup;
  returnUrl: string;
  disSubmit=false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public userService: UserService,
        private snake:MatSnackBar,
        private authenticationService: AuthenticationService,
        private styleSrv : StylerService,
        private alertService: AlertService) {}

  ngOnInit() {
    this.loginform=this.formBuilder.group({
      username:[null,Validators.required],
      password:[null,Validators.required]
    });
    
    //this.authenticationService.logout();
    this.returnUrl =this.route.snapshot.queryParams['returnUrl'] || '/';
  }//ngOnInit()

  get f(){return this.loginform.controls;}


  onSubmit(){
    this.disSubmit = true;
    // stop here if form is invalid
    if (this.loginform.invalid) {
        return;
    }    
  
    this.authenticationService.login(this.f.username.value,this.f.password.value)
    //.pipe(first())
    .subscribe(
      r=>{
        console.log("navigate to home");
        if(r.isSuccessful){
          this.disSubmit=false;
          this.router.navigate([this.returnUrl])
        }
      },
      err=>{
        if (err.status === 400) {
          this.snake.open(`${err.error.errors}`,"X",{duration:3000});
        }
        this.disSubmit=false;
        this.alertService.error(err);
      }
    );

  }//onSubmit()


  SetBodyHeight(){
    setTimeout(() => {
      //this.CalcBodyHeight();
      let height = this.styleSrv.CalcBodyHeight();
      $('#login-container').css({
        "height":height
      });
    }, 0);
  }

  ngAfterViewInit(): void {
    //this.SetBodyHeight();
  }
  ngOnDestroy(){
    location.reload();
  }

}//class
