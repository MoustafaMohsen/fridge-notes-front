import { Component, OnInit, Input } from "@angular/core";
import { Grocery, MoreInformation } from "../../../statics/Grocery";
import { HelpersService } from "../../../Services/helpers.service";
import { GListService } from "../../../Services/g-list.service";
import { AuthenticationService } from "../../../_auth.collection/_services/authentication.service";
import { list,simp,Mylist } from "../../../animations/animations";
@Component({
  selector: "app-item-card",
  templateUrl: "./item-card.component.html",
  styleUrls: ["./item-card.component.css"],
  animations:[simp,Mylist]
})
export class ItemCardComponent implements OnInit {
  @Input()
  ItemOrginal: Grocery;
  Item: Grocery;
  //FormatedTimout:string;
  lastmore: MoreInformation = {
    bought: false
  };
  constructor(
    public web: GListService,
    private helper: HelpersService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.Item = this.ItemOrginal;
    this.GEtLastMore();
    //this.FormatedTimout=this.SecondsToDays(this.Item.timeout) ;
    /*
    this.web.GuessTimeout(this.Item.id).subscribe(
       (response)=>{
         this.avrageTimeout=response; 
        this. GEtLastMore();
    })
    */
  }

  get FormatedTimout() {
    return this.helper.SecodsToDate(this.Item.timeout);
  }

  
  get ItemOwner(): { own: boolean; username: string } {
    let obj: { own: boolean; username: string } = { own: false, username: "" };
    if (this.auth.CurrentUser.UserName == this.Item.owner) {
      obj.own = true;
    }
    obj.username = this.Item.owner;
    return obj;
  }
  //Get Details
  setClasses(){
    let classes={
      MeOwner:this.ItemOwner.own
    }
    return classes;
  }
  GetDetails(index) {
    this.web.getGroceryDetails(index).subscribe(res => {
      console.log(res);
      
    });
  }

  //--------------Helper Methods
  GEtLastMore() {
    let lastmoreServer = this.Item.moreInformations[
      this.Item.moreInformations.length - 1
    ];
    this.lastmore = lastmoreServer ? lastmoreServer : this.lastmore;
  }

}