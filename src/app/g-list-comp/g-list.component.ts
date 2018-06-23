import { HelpersService } from '../Services/helpers.service';
import { element } from 'protractor';
import { GListService } from '../Services/g-list.service';
import { Component, OnInit } from '@angular/core';
import { Grocery, MoreInformation } from '../Grocery';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-g-list',
  templateUrl: './g-list.component.html',
  styleUrls: ['./g-list.component.css']
})


export class GListComponent implements OnInit {
  GList:Grocery[];
  NeededOnly:Grocery[]=this.GListService.GetNeededOnly();
      
  constructor(private GListService:GListService,private http: HttpClient) { }

  ngOnInit() {    
    this.getList();
  }

  //GET All  from Api
  getList(){
     this.GListService.getGroceries().subscribe( (response)=>
     { 
       this.GList=response; 
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

