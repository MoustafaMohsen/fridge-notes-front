import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../_auth.collection/_services/authentication.service';
import { MatSnackBar, MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../_auth.collection';

@Component({
  selector: 'app-userbar',
  templateUrl: './userbar.component.html',
  styleUrls: ['./userbar.component.css']
})
export class UserbarComponent implements OnInit {

  @ViewChild(MatMenuTrigger) userMenu: MatMenuTrigger;
  rotate=false;
  constructor(public auth:AuthenticationService,
    private snack:MatSnackBar,private router:Router,
    private usersSrv:UserService) { }

  ngOnInit() {
    console.log( this.userMenu?this.userMenu.menuOpen:false );

    
  }


  setClasses(){
    let classes={
      "rotate-down":this.userMenu?this.userMenu.menuOpen:false,
      "rotate":true,
      "fas":true,
      "fa-angle-down":true
    }
    return classes;
  }

  logoutUser(){
    this.auth.logout();
    this.snack.open("Logged Out","x",{duration:3000});
    this.router.navigate(['/login']);
  }


}
