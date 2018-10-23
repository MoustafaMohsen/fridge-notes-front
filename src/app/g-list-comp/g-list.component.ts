import { GListService } from '../Services/g-list.service';
import { Component, OnInit } from '@angular/core';
import { Grocery, MoreInformation } from '../Grocery';
import { HttpClient  } from '@angular/common/http';
import {MatSnackBar} from '@angular/material'
import { AuthenticationService } from '../_auth.collection';
import {  Router } from "@angular/router";

@Component({
  selector: 'app-g-list',
  templateUrl: './g-list.component.html',
  styleUrls: ['./g-list.component.css']
})

export class GListComponent implements OnInit {
  //public web;
  constructor(private authenticationService: AuthenticationService,
    private router:Router,public web:GListService,
    private http: HttpClient,private snack:MatSnackBar) 
  { }

  NeededOnly:Grocery[]=this.web.NeededOnly;
  

  loading:boolean;
  ngOnInit() {
    this.web.Loading$.subscribe(
      d=>{
        this.loading=d;
        console.log("loading$",d)}
      
    )
    this.web.UpdateList$.subscribe(
      ()=>{
        this.web.getList();
      }
    );
    this.web.UpdateList$.next();
  }


 
  SecondsToDays(s:number):string{
    if(s<3600*24){
      var s=s/3600;
      if (s<3600){return ""+Math.floor(s*24)+" Hours"}
      return ""+Math.floor(s)+" Hours"

    }
    else{
      var s=s/3600/24;
      return ""+Math.floor(s)+" Days"
    }
  }
  
  
}//class

