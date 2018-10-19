import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_auth.collection/_services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../_auth.collection';

@Component({
  selector: 'app-userbar',
  templateUrl: './userbar.component.html',
  styleUrls: ['./userbar.component.css']
})
export class UserbarComponent implements OnInit {

  constructor(public auth:AuthenticationService,
    private snack:MatSnackBar,private router:Router,
    private usersSrv:UserService) { }

  ngOnInit() {
  }


  logoutUser(){
    this.auth.logout();
    this.snack.open("Logged Out","x",{duration:3000});
    this.router.navigate(['/login']);
  }

  GenInvitaion(){
    var resonse =this.usersSrv.GenerateInvitaionCode().subscribe(r=>{
      var code = r.value
      console.log(code);
      
    });
  }
}
