import { Grocery } from "../statics/Grocery";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";

import { _BaseUrl } from "../statics/config";
import { UserDto } from "../_auth.collection/_models/user";
import { AuthenticationService } from "../_auth.collection/_services/authentication.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { StylerService } from "./styler.service";

import { ResponseDto ,GroceryDto } from "../statics/Dto";

@Injectable()
export class GListService {
  URL = `${_BaseUrl}/api/GroceriesApi`;

  globalRandom: string;
  Lastdate = -1;
  showAddCard: boolean = false;
  showAddCard$: Subject<boolean> = new Subject();
  clickAddCardButton$: Subject<boolean> = new Subject();

  AddFromItem: Grocery = {
    name: "",
    moreInformations: [{ bought: false, no: 1, typeOfNo: "" }],
    timeout: 0
  };
  Loading$: Subject<boolean> = new Subject();
  Loading: boolean = false;
  UpdateList$: Subject<{loading?:boolean,refresh?:boolean,scrollId?:string,ExcuteOnSuccess?:Function}> = new Subject();
  public Glist: Grocery[];
  public NeededOnly: Grocery[];
  public BoughtOnly: Grocery[]; /*= [
    { name: "", moreInformations: [{ bought: false }] }
  ];*/
  formItem: FormGroup;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    public auth: AuthenticationService,
    formBuilder: FormBuilder,
    private styler: StylerService
  ) {
    this.formItem = formBuilder.group({
      name: ["", [Validators.required]],
      no: [1, [Validators.required]],
      type: ["", []],
      basic: [false, [Validators.required]]
    });
    this.Loading$.subscribe(l => (this.Loading = l));
    this.UpdateList$.asObservable().subscribe(options => {
      var now = Date.now() / 1000;
      var diff = now - this.Lastdate;

      let _loading = options ? options.loading : false;
      let _refresh = options ? options.refresh : false;
      let scrollId = options ? options.scrollId : "";
      let ExcuteOnSuccess = options ? options.ExcuteOnSuccess:null;
      if (diff > 1 || this.Lastdate == -1 || _refresh) {
        this.Lastdate = Date.now() / 1000;
        this.getList(_loading, scrollId,ExcuteOnSuccess);
      }
    });

    this.showAddCard$.subscribe(s => (this.showAddCard = s));
    this.globalRandom = this.randomStr(5);
  }

  //get isThereNeeded(){ this.NeededOnly.}
  //===== Gets
  getGroceries(): Observable<ResponseDto<Grocery[]>> {
    return this.http.get<ResponseDto<Grocery[]>>(this.URL);
  }

  getGroceryDetails(id: number): Observable<ResponseDto<Grocery>> {
    return this.http.get<ResponseDto<Grocery>>(`${this.URL}/grocerybyid?groceryid=${id}`);
  }

  //===== Updates
  UpdateStatus(grocery: Grocery, req: string) {
    let id = this.GetUserIdByGroceryId(grocery.ownerid);
    var groceryDto: GroceryDto = {
      grocery: grocery,
      userId: id
    };
    console.log(groceryDto);

    this.http
      .post<ResponseDto<object>>(`${this.URL}/request/${req}`, groceryDto)
      .subscribe(
        response => {
          this.snack.open("" + response.statusText, "X", { duration: 2000 });
          this.UpdateList$.next();
        },
        e => {
          console.log(e);
          this.snack.open(`Faild to connect to the Server`, "X");
        },
        () => {
          console.log("Completed");
        }
      ); //subscirbe
  }

  //===== Updatessubscribe
  request(grocery: Grocery, req: string) {
    let id = this.GetUserIdByGroceryId(grocery.ownerid);
    var groceryDto: GroceryDto = {
      grocery: grocery,
      userId: id
    };
    console.log("request()");
    
    console.log(groceryDto);

    return this.http.post<ResponseDto<string>>(
      `${this.URL}/request/${req}`,
      groceryDto
    );
  }

  isGroceryNameExsits(name: string) {
    return this.http.post<ResponseDto<boolean>>(`${this.URL}/nameExists/`, { value: name });
  }
  
  GuessTimeout(id: number) {
    return this.http.get<any>(`${this.URL}/guess/${id}`);
  }
  
  //===== Services
  GetUserIdByGroceryId(ownerid: string): string {
    if (this.auth.CurrentUser.Id == ownerid) {
      return this.auth.CurrentUser.Id;
    } else {
      return ownerid;
    }
  }



  //GET All  from Api
  getList(HandlLoading = true, scrollId = "",ExcuteOnSuccess?:Function) {
    if (HandlLoading) this.Loading$.next(true);
    this.getGroceries().subscribe(
      response => {
        var GroceryUpdateList = (MasterGrocery, SlaveGrocery) => {
          console.log("Updatng values");

          for (let i = 0; i < SlaveGrocery.length; i++) {
            const G = SlaveGrocery[i];
            //filter function
            var IsG = g => {
              return (
                g.id == G.id &&
                g.moreInformations.length == G.moreInformations.length &&
                g.groceryOrBought == G.groceryOrBought &&
                g.ownerid == G.ownerid
              );
            };
            var exsists = MasterGrocery.find(IsG) ? true : false;
            if (!exsists) {
              console.log("removed " + i);
              console.log(SlaveGrocery[i]);
              SlaveGrocery.splice(i, 1);
            }
          }//for

          for (let i = 0; i < MasterGrocery.length; i++) {
            const item = MasterGrocery[i];
            //filter function
            var IsG = g => {
              return (
                g.id == item.id &&
                g.moreInformations.length == item.moreInformations.length &&
                g.groceryOrBought == item.groceryOrBought &&
                g.ownerid == item.ownerid
              );
            };
            var exsists = SlaveGrocery.find(IsG) ? true : false;
            if (!exsists) {
              console.log("added " + i);
              console.log(item);
              SlaveGrocery.push(item);
            }
          }//for
        };

        if (response.isSuccessful==false) {
          console.log(response.errors);
          this.snack.open(`Server returned ${response.errors}`,`X`,{duration:3000})
          return;
        }

        let groceries = response.value;
        console.log("getGroceries()");
        console.log(response);
        
        if (!this.Glist) {
          this.Glist = groceries;
        } else {
          GroceryUpdateList(groceries, this.Glist);
        }

        //Filter to needed only
        var HoldNeeded: Grocery[] = [];

        for (let index = 0; index < groceries.length; index++) {
          const item = groceries[index];
          if (item.groceryOrBought) HoldNeeded.push(item);
        }

        if (!this.NeededOnly) {
          this.NeededOnly = HoldNeeded;
        } else {
          GroceryUpdateList(HoldNeeded, this.NeededOnly);
        }

        //Filter to bought only
        var holdBought: Grocery[] = [];

        for (let index = 0; index < groceries.length; index++) {
          const item = groceries[index];
          if (!item.groceryOrBought) holdBought.push(item);
        }
        if (!this.BoughtOnly) {
          this.BoughtOnly = holdBought;
        } else {
          GroceryUpdateList(holdBought, this.BoughtOnly);
        }
        
        if(ExcuteOnSuccess) 
          ExcuteOnSuccess()

        if (scrollId) this.styler.scrollById(scrollId, 500);
        if (HandlLoading) this.Loading$.next(false);
      },
      e => {
        if (HandlLoading) this.Loading$.next(false);
        console.log("g-list error");
        console.error(e);
        this.snack.open("Connection Error, Server Disconnected", "X", {
          duration: 10000
        });
      },
      () => {
        console.log("Completed");
      }
    );
  }
  clean() {
    //(click) Add button
    this.AddFromItem = {
      name: "",
      moreInformations: [{ bought: false, no: 1, typeOfNo: "" }],
      basic: false,
      timeout: 0,
      owner: this.auth.CurrentUser.UserName,
      groceryOrBought: false
    };
    this.formItem.controls.name.setValue("", [Validators.required]);
    this.formItem.controls.no.setValue(1, [Validators.required]);
    this.formItem.controls.type.setValue("");
    this.formItem.controls.basic.setValue(false);
    this.formItem.enable();
    this.formItem.markAsUntouched();
  }
  ViewIdByname(name) {
    name = name.toLowerCase().replace(/[\s ]/g, "");
    return "card" + name + this.globalRandom;
  }

  randomId(index: number, index2: number) {
    var r = "yXqEyfZDpOLvPWhdcKzqTomGQYXqxutkyGElskQANcxFkDxNYWgIKhr";
    var s = "";
    for (var i = 0; i < 5; i++) {
      s += r.charAt(index + i + index2);
    }
    return s;
  }

  randomStr(m) {
    var m = m || 9;
    var s = "",
      r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < m; i++) {
      s += r.charAt(Math.floor(Math.random() * r.length));
    }
    return s;
  }
} //class
