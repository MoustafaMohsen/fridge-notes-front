import { GListService } from '../Services/g-list.service';
import { Component, OnInit } from '@angular/core';
import { Grocery, MoreInformation } from '../Grocery';
import { HttpClient  } from '@angular/common/http';
import {MatSnackBar} from '@angular/material'

@Component({
  selector: 'app-g-list',
  templateUrl: './g-list.component.html',
  styleUrls: ['./g-list.component.css']
})

export class GListComponent implements OnInit {
  //public web;
  constructor(public web:GListService,private http: HttpClient,private snackBar:MatSnackBar) 
  { }

  GList:Grocery[];
  NeededOnly:Grocery[]=this.web.NeededOnly;
  

  ngOnInit() {
    this.web.UpdateList$.subscribe(
      ()=>{
        this.getList();console.log("$event Emited$");
      }
    );
    this.web.UpdateList$.next();
  }

  //GET All  from Api
  getList(){
     this.web.getGroceries().subscribe( (response)=>
      { 
       this.web.Glist=response; 
        //Filter to needed only
        {
          var HoldNeeded:Grocery[]=[{name:'',moreInformations:[{bought:false, }]}];
          response.forEach(item =>{
            if (item.moreInformations[(item.moreInformations.length -1) ].bought)
              HoldNeeded.push(item)
            });
          HoldNeeded.shift();
          this.web.NeededOnly=HoldNeeded;
        }
      },
      (e)=>{
         this.snackBar.open( "Faild to connect to the Server","X" );
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

}

