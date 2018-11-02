import { Component, OnInit,Input } from '@angular/core';
import { GListService } from '../Services/g-list.service';
import { HelpersService } from '../Services/helpers.service';
import { Grocery, MoreInformation } from '../Grocery';
import { FormatService } from '../Services/frormat.service';
import { MatSnackBar } from '@angular/material';
import { EditAnimation,FadeAnimationIn } from "../animations/animations";
import { Subject } from 'rxjs';
declare var $ :any;





@Component({
  selector: 'app-card-buttons',
  templateUrl: './card-buttons.component.html',
  styleUrls: ['./card-buttons.component.css'],
  animations:[EditAnimation,FadeAnimationIn]
})

export class CardButtonsComponent implements OnInit {
  @Input() timeoutDay ;
  buttonClick:boolean;
  MoreButton:boolean=false;
  MoreButton$:Subject<boolean>=new Subject()

  //R
  lastmoreInformations:MoreInformation={bought:false  ,no:1 ,typeOfNo :""};
  NeededClicked:boolean=false;
  @Input() Item:Grocery;
  TheRandomString: string=this.helper.randomString();
  removeIdConfirm:string="#"+this.TheRandomString;
  removeConfirmForId:string=this.TheRandomString;
  
  //R
  constructor(public web:GListService,private formatService:FormatService,
    public snackBar: MatSnackBar,private helper:HelpersService) { }

  ngOnInit() {
    this.MoreButton$.subscribe(b=>{
      this.MoreButton=b;
      if(!b){
      this.buttonClick=b;
    }})
  }

  Edit(g:Grocery){
    if (g.name ==''){ return }//if the data is empty
    //->bad code
    g.timeout =  this.timeoutDay*3600*24 +(Date.now()/1000)
    //bad code<-
    this.web.UpdateStatus(g,"edit")
    this.buttonClick=false; 
  }

  remove(grocery:Grocery):void{
    console.log(grocery);
    
    //checking
    //var groceryRequest=this.formatService.Toremove(grocery)
    if (grocery.moreInformations.length <= 1 ) {
        this.snackBar.open("Item doesn't have any history To undo", "X", {duration: 9000,});
        $(this.removeIdConfirm).modal('hide');
        return
    }    
    this.web.UpdateStatus(grocery,"remove");
    //Close Dialog
    $(this.removeIdConfirm).modal('hide');
  }
  
  DELETE(Item:Grocery){
          //sendDelete
          var grocery =Item;
          this.web.UpdateStatus(grocery,"delete");
          //Close Dialog
          $(this.removeIdConfirm).modal('hide');
  }
  
  Bought(Item:Grocery){
    //Send Bought
    var grocery= this.formatService.Tobought(Item)
    console.log(grocery);
    this.web.UpdateStatus(grocery,"bought");
  }
  
  //Needed Logic
  Needed(g:Grocery){   //(click) Needed button
    this.NeededClicked=!this.NeededClicked
    g.timeout =  this.timeoutDay*3600*24     
    var grocery= this.formatService.Toneed(g,g.basic,g.timeout,this.lastmoreInformations);
    this.web.UpdateStatus(grocery,"needed");
  }
  


}//class


