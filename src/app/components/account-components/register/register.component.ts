import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, AlertService, AuthenticationService } from '../../../_auth.collection';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TestMethodsService } from 'src/app/test-methods.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  registerForm: FormGroup;
  loading = false;
  disSubmit = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private snake:MatSnackBar,
      private userService: UserService,
      private alertService: AlertService,
      private authenticationService: AuthenticationService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', Validators.required],
          email:['', Validators.compose([Validators.required, Validators.email])]
      });
  }

  // convenience getter for easy access to form fields
  get f(){return this.registerForm.controls;}

  onSubmit() {
      this.disSubmit = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.Register(this.registerForm.value)
          .subscribe(
            r => {
                if (r.isSuccessful) {
                    this.snake.open(`Registration successful, logging in...`,"X",{duration:3000});

                    //internal login
                    let username=this.f.username.value;
                    let password=this.f.password.value;
                    this.login(username,password,"check-email")
                }
                else{
                    this.snake.open(`Operation unsuccessfull!`,"X",{duration:20000});
                    console.error(r);
                    ;
                }
            },
            err => {
                this.snake.open(`${err.error.errors}`,"X",{duration:20000});
                this.disSubmit = false;
                this.alertService.error(err);
                this.loading = false;
            });
  }

login(username:string,password:string,returnUrl:string){
    this.authenticationService.login(username,password)
    //.pipe(first())
    .subscribe(
      r=>{
        console.log("navigate to home");
        if(r.isSuccessful){
          this.disSubmit=false;
          this.router.navigate([returnUrl])
        }
      },
      err=>{
        this.snake.open(`${err.error.errors}`,"X",{duration:3000});
        this.disSubmit=false;
      }
    );
  }


  ngOnDestroy(){
      //location.reload()
  }
}
