import { Component, OnInit,Input } from '@angular/core';
import { Grocery, MoreInformation } from '../Grocery';
import { HelpersService } from '../Services/helpers.service';
import { GListService } from '../Services/g-list.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() ItemOrginal:Grocery;
  Item:Grocery;
  //FormatedTimout:string;
  lastmore:MoreInformation={
    bought:false

  }
  constructor(private web:GListService,private helper:HelpersService) { }

  ngOnInit() {
    this.Item=this.ItemOrginal;
    console.log(this.Item);
    //this.FormatedTimout=this.SecondsToDays(this.Item.timeout) ;
    /*
    this.web.GuessTimeout(this.Item.id).subscribe(
       (response)=>{
         this.avrageTimeout=response; 
        this. GEtLastMore();
    })
    */
  }

  get FormatedTimout(){return this.SecondsToDays(this.Item.timeout)}
  
    //Get Details
    GetDetails(index){    
      this.web.getGroceryDetails(index).subscribe(res=>{console.log(res);})
    }
  

//--------------Helper Methods

  //---HELPERS
  ToDate(s){
    return this.helper.formatDate(s)
   }
   
  SecondsToDays(s:number):string{

    if(s<3600*24){
      if(s<3600) {
          if(s<60){return ""+Math.floor(s)+" secounds !"}

        return ""+Math.floor(s/60)+" Minutes"
      }

      return ""+Math.floor( s/(60*60) )+" Hours"
    }
      return ""+Math.floor( s/(3600*24) )+" Days"
  }

    PersentageTimeout(timeout):number{
      return this.helper.PersentageTimeout(timeout)
     }


     GEtLastMore(){
      this.lastmore=this.Item.moreInformations[this.Item.moreInformations.length-1];
    }  
    
}
