import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../_auth.collection/_services/authentication.service';
import { MatSnackBar, MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../../../_auth.collection';
import { GListService } from '../../../Services/g-list.service';

@Component({
  selector: 'app-userbar',
  templateUrl: './userbar.component.html',
  styleUrls: ['./userbar.component.css']
})
export class UserbarComponent implements OnInit {

  //@ViewChild(MatMenuTrigger) userMenu: MatMenuTrigger;
  rotate=false;
  constructor(public auth:AuthenticationService,
    private snack:MatSnackBar,private router:Router,
    private usersSrv:UserService,
    public web:GListService) { }

  ngOnInit() {

    
  }

  SetLoadingAndellipsis(){
    let classes={
      "fas":true,
      "fa-ellipsis-v":true,
      "loading-rotate-start":this.web.Loading,
      "loading-rotate":true,
    }
    return classes;
  }
  SetLoadingAndrefresh(){
    let classes={
      "fas":true,
      "fa-sync-alt":true,
      "loading-rotate-start":this.web.Loading,
      "loading-rotate":true,
    }
    return classes;
  }

  logoutUser(){
    this.auth.logout();
    this.snack.open("Logged Out","x",{duration:3000});
    this.router.navigate(['/login']);
  }


}
