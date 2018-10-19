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

  GList:Grocery[];
  NeededOnly:Grocery[]=this.web.NeededOnly;
  

  ngOnInit() {
    this.web.UpdateList$.subscribe(
      ()=>{
        this.getList();
      }
    );
    this.web.UpdateList$.next();
  }

  //GET All  from Api
  getList(){
     this.web.getGroceries().subscribe( (response)=>
      {
       let groceries = response.value;
       this.web.Glist=groceries; 
        //Filter to needed only
        var HoldNeeded:Grocery[]=[{name:'',moreInformations:[{bought:false, }]}];

        for (let index = 0; index < groceries.length; index++) {
          const item = groceries[index];
          if (item.moreInformations[(item.moreInformations.length -1) ].bought)
            HoldNeeded.push(item)
        }

        HoldNeeded.shift();
        this.web.NeededOnly=HoldNeeded;
      },
      (e)=>{
        console.log("g-list error");
        console.error(e);
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

