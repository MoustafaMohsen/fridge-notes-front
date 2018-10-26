import { FormatService } from "../Services/frormat.service";
import { Grocery, MoreInformation } from "./../Grocery";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { GListService } from "../Services/g-list.service";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../_auth.collection";
import {trigger,state,style,animate, transition,group,keyframes} from "@angular/animations";
import { StylerService } from "../Services/styler.service";

const anim3=[trigger('YCardSlide', [
  state('*', style({'overflow-y': 'hidden',height: '*',opacity:1 })),//shown state
  state('void', style({ 'overflow-y': 'hidden' ,height: '0',opacity:0})),//hidden state

  transition('void => *', [//Show
    style({ }),
    animate('150ms ease-in',keyframes([
      style({'transform':'translateY(100%) scale(0)',opacity:0,height: '0',offset:0}),//hidden
      style({'transform': "translateY(0%) scale(1)",opacity:1,height: '*',offset:1}),//shown
    ]))
  ]),
  transition('* => void', [//Hide
      style({  }),
      animate('150ms ease-out', keyframes([
        style({'transform':'translateY(0%) scale(1)',opacity:1,height: '*',offset:0}),//shown
        style({'transform': "translateY(100%) scale(0)",opacity:0,height: '0',offset:1}),//hidden
      ]))
  ])

])];



@Component({
  selector: "app-add-card",
  templateUrl: "./add-card.component.html",
  animations: [anim3],
  styleUrls: ["./add-card.component.css"]
})
export class AddCardComponent implements OnInit {
  timeoutDay;
  NeededOnly: Grocery[] = [{ name: "", moreInformations: [{ bought: false }] }];

  //---------remove private formBuilder
  constructor(
    private formatService: FormatService,
    public web: GListService,
    private snackBar: MatSnackBar,
    private auth: AuthenticationService,
    private style:StylerService
  ) {}
  ngOnInit() {
    this.web.showAddCard$.subscribe(s=>{
      if (s=true) {
        this.style.scrollById("Scrolltarget_1")
        this.style.focusById("NameFieldEl")
      }
    })
  }

  //add method
  add() {
    if (this.web.formItem.invalid) return;

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
      owner: this.auth.CurrentUser.username,
      ownerid: this.auth.CurrentUser.id,
      groceryOrBought: bought
    };

    this.web.Loading$.next(true);
    this.web.request(g, "add").subscribe(
      r => {
        this.web.Loading$.next(false);
        this.web.UpdateList$.next({Loading:false});
        this.web.showAddCard = false;
        this.web.clean();
      },
      e => {
        this.web.Loading$.next(false);
        this.snackBar.open(`Failed to add item ${e.error}`, "X", {
          duration: 5000
        });
      }
    );
  }
}
