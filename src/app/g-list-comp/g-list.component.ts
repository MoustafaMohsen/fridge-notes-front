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
        this.getList();
      }
    );
    this.web.UpdateList$.next();
  }

  //GET All  from Api
  getList(){
     this.web.Loading$.next(true);
     this.web.getGroceries().subscribe( 
       (response)=>
      {
      this.web.Loading$.next(false);
       let groceries = response.value;
       this.web.Glist=groceries; 
        //Filter to needed only
        var HoldNeeded:Grocery[]=[{name:'',moreInformations:[{bought:false, }]}];

        for (let index = 0; index < groceries.length; index++) {
          const item = groceries[index];
          if (item.groceryOrBought)
            HoldNeeded.push(item)
        }

        HoldNeeded.shift();
        this.web.NeededOnly=HoldNeeded;
      },
      (e)=>{
        this.web.Loading$.next(false);
        console.log("g-list error");
        console.error(e);
        this.snack.open("Connection Error, Server Disconnected","X",{duration:10000})
      },
      ()=> {console.log("Completed");
      }
    );
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

