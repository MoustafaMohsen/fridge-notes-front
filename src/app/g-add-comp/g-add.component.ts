import { FormatService } from "../Services/frormat.service";
import { Grocery, MoreInformation } from "./../Grocery";
import { Component, OnInit, Input } from "@angular/core";
import { GListService } from "../Services/g-list.service";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-g-add",
  templateUrl: "./g-add.component.html",
  styleUrls: ["./g-add.component.css"]
})
export class GAddComponent implements OnInit {
  buttonClick: boolean;
  MakeitNeeded: boolean = false;
  timeoutDay;
  Item: Grocery = {
    name: "",
    moreInformations: [{ bought: false, no: 1, typeOfNo: "" }],
    timeout: 0
  };
  lastmoreInformations: MoreInformation = {
    bought: false,
    no: 1,
    typeOfNo: ""
  };

  NeededOnly: Grocery[] = [{ name: "", moreInformations: [{ bought: false }] }];

  formItem: FormGroup;

  //---------remove private formBuilder
  constructor(
    public web: GListService,
    formBuilder: FormBuilder,
    private formatService: FormatService,
    private snackBar: MatSnackBar
  ) {
    this.formItem = formBuilder.group({
      name: ["", [Validators.required]],
      no: [1, [Validators.required]],
      type: ["", []],
      basic: [false, []]
    });
  }
  ngOnInit() {}

  //add method
  add() {
    //(click) Add to List button
    var g: Grocery = {
      name: "",
      moreInformations: [{ bought: false, no: 1, typeOfNo: "" }],
      timeout: 0
    };
    g.name = this.f.name.value;
    g.moreInformations[0].no = this.f.no.value;
    g.basic = this.f.basic.value;
    g.moreInformations[0].typeOfNo = this.f.type.value;
    console.log(g);

    if (g.name == "") {
      this.snackBar.open("" + "Empty Name", "X", { duration: 2000 });
      return;
    } //if the data is empty
    console.log("sending add");
    console.log(g);
    g.timeout = this.timeoutDay * 3600 * 24;
    this.web.Loading$.next(true);
    var grocery = this.formatService.Toadd(
      g,
      g.name,
      g.basic,
      g.timeout,
      this.lastmoreInformations
    );
    this.web
      .request(grocery, "add")

      //GET All  from Api
      .subscribe(
        r => {
          this.web.Loading$.next(false);
          this.web.UpdateList$.next(false);
        },
        e => {
          this.web.Loading$.next(false);
          console.log("===add Error==");
          console.log(e);
          console.log("===add Error==");

          this.snackBar.open("Failed to add item", "X", { duration: 5000 });
        }
      );
  }

  get f() {
    return this.formItem.controls;
  }

  //Needed Logic
  Needed() {
    //(click) Needed button

    var timeout = this.timeoutDay * 3600 * 24;
    var lastmore = this.Item.moreInformations[this.Item.moreInformations.length - 1];

    lastmore.no = this.f.no.value;
    lastmore.typeOfNo = this.f.type.value;
    const grocery = this.formatService.Toneed(
      this.Item,
      this.f.basic.value,
      timeout,
      lastmore
    );

    console.log(grocery);

    //this.web.UpdateStatus(grocery,"edit");
    this.buttonClick = false;
    this.clean();
  }

  SelectedSuggestion(g: Grocery) {
    //(click) Suggestion button
    console.log("SelectedSuggestion()");
    console.log(g);
    this.lastmoreInformations =
      g.moreInformations[g.moreInformations.length - 2]; //last needed status
    this.f.name.setValue(g.name);
    this.f.name.disable();
    this.f.no.setValue(this.lastmoreInformations.no);
    this.f.type.setValue(this.lastmoreInformations.typeOfNo);
    this.f.basic.setValue(g.basic);
    this.f.basic.disable();
    this.Item = { ...g };
    this.MakeitNeeded = true;
  }

  clean() {
    //(click) Add button
    this.MakeitNeeded = false;
    this.Item = {
      name: "",
      moreInformations: [{ bought: false, no: 1, typeOfNo: "" }]
    };

    this.f.name.setValue("", [Validators.required]);
    this.f.no.setValue(1, [Validators.required]);
    this.f.type.setValue("");
    this.f.basic.setValue(false);
    this.formItem.enable();
    this.formItem.markAsUntouched();
  }
} //class
