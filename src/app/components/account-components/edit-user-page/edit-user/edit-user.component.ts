import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthenticationService, UserDto, UpdatePasswordDto, UserService } from '../../../../_auth.collection';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(
    formbuilder:FormBuilder,
    private router: Router,
    private auth:AuthenticationService,
    private user:UserService,
    private snack:MatSnackBar
    ) {
   }//constructor
  ngOnInit() {
  }
}//class
