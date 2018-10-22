import { HelpersService } from "../Services/helpers.service";
import { Component, OnInit, Input } from "@angular/core";
import { GListService } from "../Services/g-list.service";
import { Grocery, MoreInformation } from "../Grocery";
import { FormatService } from "../Services/frormat.service";
import { MatSnackBar } from "@angular/material";
import { FormBuilder, Validators } from "@angular/forms";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-g-update",
  templateUrl: "./g-update.component.html",
  styleUrls: ["./g-update.component.css"]
})
export class GUpdateComponent implements OnInit {
  constructor(
    private web: GListService,
    private formatService: FormatService,
    private helper: HelpersService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.lastmoreInformations = this.Item.moreInformations[
      this.Item.moreInformations.length - 1
    ];
  }
  @Input()
  Item: Grocery;

  lastmoreInformations: MoreInformation = {
    bought: false,
    no: 1,
    typeOfNo: ""
  };
  timeoutDay = 0;
  boughtClicked: boolean = false;
  //Remove
  TheRandomString: string = this.helper.randomString();
  removeIdConfirm: string = "#" + this.TheRandomString;
  removeConfirmForId: string = this.TheRandomString;

  Bought() {
    //(click) Bought button
    let g: Grocery = { ...this.Item };
    // g.timeout =  this.timeoutDay*3600*24  ;
    var grocery = this.formatService.Tobought(g);
    this.web.Loading$.next(true);
    this.web.request(grocery, "bought").subscribe(
      response => {
        this.snack.open(`${response.statusText}`, "X", { duration: 5000 });
        this.web.UpdateList$.next();
      },
      e => {
        console.log(e);

        this.snack.open("Request failed", "X", { duration: 5000 });
        console.log("Request failed");
      }
    );
  }

  //Needed Logic
  Needed() {
    this.web.Loading$.next(true);
    //(click) Needed button
    let g: Grocery = { ...this.Item };
    this.boughtClicked = !this.boughtClicked;
    var grocery = this.formatService.Toneed(
      g,
      g.basic,
      g.timeout,
      this.lastmoreInformations
    );

    this.web.request(grocery, "needed").subscribe(
      response => {
        this.snack.open(`${response.statusText}`, "X", { duration: 2000 });
        this.web.UpdateList$.next();
      },
      () => {
        this.snack.open("Request failed", "X", { duration: 2000 });
      }
    );
  }
}
