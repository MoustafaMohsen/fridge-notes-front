import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, AlertService } from '../../../_auth.collection';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

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
      private alertService: AlertService) { }

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
                this.disSubmit = false;
                if (r.isSuccessful) {
                    this.snake.open(`Registration successful`,"X",{duration:3000});
                    this.router.navigate(['/login']);
                }
                else{
                    this.snake.open(`${r.errors}`,"X",{duration:3000});
                }
            },
            err => {
                this.snake.open(`${err.error.errors}`,"X",{duration:3000});
                this.disSubmit = false;
                this.alertService.error(err);
                this.loading = false;
            });
  }

  

  ngOnDestroy(){
      //location.reload()
  }
}
