import { HelpersService } from '../Services/helpers.service';
import { Component, OnInit,Input } from '@angular/core';
import { GListService } from '../Services/g-list.service';
import { Grocery, MoreInformation } from '../Grocery';
import { FormatService } from '../Services/frormat.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-g-update',
  templateUrl: './g-update.component.html',
  styleUrls: ['./g-update.component.css'],
})
export class GUpdateComponent implements OnInit {
  constructor(private GListService:GListService,private formatService:FormatService,private helper:HelpersService) { }
  ngOnInit() {
    this.lastmoreInformations=this.Item.moreInformations[this.Item.moreInformations.length-1]
  }
  @Input() Item:Grocery;

  @Input() lastmoreInformations:MoreInformation={bought:false  ,no:1 ,typeOfNo :""};
  @Input() timeoutDay=0;
  @Input() bought:boolean;//Determin What button to show Needed or Bought
  boughtClicked:boolean=false;
  //Remove
  TheRandomString: string=this.helper.randomString();
  removeIdConfirm:string="#"+this.TheRandomString;
  removeConfirmForId:string=this.TheRandomString;


  Bought(g:Grocery){//(click) Bought button
    g.timeout =  this.timeoutDay*3600*24  ;
    var grocery= this.formatService.Tobought(g)
    console.log(grocery);
    this.GListService.UpdateStatus(grocery,"bought");
  }
  
  //Needed Logic
  Needed(g:Grocery){//(click) Needed button
    this.boughtClicked=!this.boughtClicked
    var grocery= this.formatService.Toneed(g,g.basic,g.timeout,this.lastmoreInformations);
    this.GListService.UpdateStatus(grocery,"needed");
  }
}