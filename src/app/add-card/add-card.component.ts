import { FormatService } from "../Services/frormat.service";
import { Grocery, MoreInformation } from "./../Grocery";
import { Component, OnInit, Input } from "@angular/core";
import { GListService } from "../Services/g-list.service";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../_auth.collection";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  buttonClick: boolean;
  timeoutDay;
  Item: Grocery = {
    name: "",
    moreInformations: [{ bought: false, no: 1, typeOfNo: "" }],
    timeout: 0
  };


  NeededOnly: Grocery[] = [{ name: "", moreInformations: [{ bought: false }] }];

  formItem: FormGroup;

  //---------remove private formBuilder
  constructor(
    public web: GListService,
    formBuilder: FormBuilder,
    private formatService: FormatService,
    private snackBar: MatSnackBar,
    private auth:AuthenticationService
  ) {
    this.formItem = formBuilder.group({
      name: ["", [Validators.required]],
      no: [1, [Validators.required]],
      type: ["", []],
      basic: [false, [Validators.required]]
    });
  }
  ngOnInit() {}

  //add method
  add() {
    if (this.formItem.invalid) 
      return;

    let name = this.f.name.value;
    let no = this.f.no.value;
    let basic = this.f.basic.value;
    let typeOfNo= this.f.type.value;
    let timeout = this.timeoutDay * 3600 * 24;
    let bought=false
    
    let g: Grocery = {
      name: name,
      moreInformations: [{ bought: bought, no: no, typeOfNo: typeOfNo }],
      basic:basic,
      timeout: timeout,
      owner:this.auth.CurrentUser.username,
      groceryOrBought:bought
    };
    
    this.web.Loading$.next(true);
    this.web.request(g, "add").subscribe(
        r => {
          this.web.Loading$.next(false);
          this.web.UpdateList$.next(false);
          this.buttonClick=false;
          this.clean();
        },
        e => {
          this.web.Loading$.next(false);
          this.snackBar.open(`Failed to add item ${e.error}`, "X", { duration: 5000 });
        }
      );
  }

  get f() {
    return this.formItem.controls;
  }


  clean() {
    //(click) Add button
    this.Item = {
      name: "",
      moreInformations: [{ bought: false, no: 1, typeOfNo: "" }],
      basic:false,
      timeout: 0,
      owner:this.auth.CurrentUser.username,
      groceryOrBought:false
    };
    this.f.name.setValue("", [Validators.required]);
    this.f.no.setValue(1, [Validators.required]);
    this.f.type.setValue("");
    this.f.basic.setValue(false);
    this.formItem.enable();
    this.formItem.markAsUntouched();
  }
}
