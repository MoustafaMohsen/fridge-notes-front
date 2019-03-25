import { FormatService } from "../../../Services/frormat.service";
import { Grocery, MoreInformation } from "../../../statics/Grocery";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { GListService } from "../../../Services/g-list.service";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../_auth.collection";
import {trigger,state,style,animate, transition,group,keyframes} from "@angular/animations";
import { StylerService } from "../../../Services/styler.service";
import { CardAnimation } from "../../../animations/animations";

@Component({
  selector: "app-add-card",
  templateUrl: "./add-card.component.html",
  animations: [CardAnimation],
  styleUrls: ["./add-card.component.css"]
})
export class AddCardComponent implements OnInit {
  timeoutDay;
  NeededOnly: Grocery[] = [{ name: "", moreInformations: [{ bought: false }] }];

  lastAdded
  //---------remove private formBuilder
  constructor(
    private formatService: FormatService,
    public web: GListService,
    private snackBar: MatSnackBar,
    private auth: AuthenticationService,
    private styler:StylerService
  ) {}
  ngOnInit() {
    this.web.showAddCard$.subscribe(s=>{
      if (s=true) {
        this.styler.scrollById("Scrolltarget_1",100)
        this.styler.focusById("NameFieldEl",500)
      }
    });

  }

  //add method
  add() {
    if (this.web.formItem.invalid) {
      this.web.formItem.markAsTouched();
      return;
    };

    let name = this.web.formItem.controls.name.value;
    let no = this.web.formItem.controls.no.value;
    let basic = this.web.formItem.controls.basic.value;
    let typeOfNo = this.web.formItem.controls.type.value;
    let timeout = this.timeoutDay * 3600 * 24;
    let bought = false;

    let g: Grocery = {
      name: name,
      moreInformations: [{ bought: bought, no: no, typeOfNo: typeOfNo }],
      basic: basic,
      timeout: timeout,
      owner: this.auth.CurrentUser.UserName,
      ownerid: this.auth.CurrentUser.Id,
      groceryOrBought: bought
    };
    this.lastAdded={...g}

    this.web.Loading$.next(true);
    this.web.request(g, "add").subscribe(
      r => {
        let options={scrollId:this.web.ViewIdByname(this.lastAdded.name),Loading:false}
        this.web.Loading$.next(false);
        this.web.UpdateList$.next(options);
        this.web.showAddCard = false;
        this.web.clean();
        this.styler.focusById("home-add-button")
      },
      e => {
        this.web.Loading$.next(false);
        let preError="Failed to add item:";
        let ServerError = e.error?e.error.errors? `"${e.error.errors}"` :"":""
        this.snackBar.open(`${preError} ${ServerError}`, "X", {
          duration: 5000
        });
      }
    );
  }
  keydown(str){
    console.log(str);
    if (str === 'enter') {
      this.add();
    }

    if (str === 'escape') {
      this.close();
    }

  }
  close() {
    this.web.showAddCard$.next(false);
    this.web.clean();
  }
}
