import { Grocery, ResponseDto, GroceryDto } from "../Grocery";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";

import { _BaseUrl } from "../config";
import { UserDto } from "../_auth.collection/_models/user";
import { AuthenticationService } from "../_auth.collection/_services/authentication.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { StylerService } from "./styler.service";

@Injectable()
export class GListService {
  URL = `${_BaseUrl}/api/GroceriesApi`;


  globalRandom:string
  Lastdate = -1;
  showAddCard:boolean=false;
  showAddCard$:Subject<boolean>=new Subject();
  
  AddFromItem: Grocery = {
    name: "",
    moreInformations: [{ bought: false, no: 1, typeOfNo: "" }],
    timeout: 0
  };
  Loading$: Subject<boolean> = new Subject();
  Loading:boolean=false;
  Glist$: Subject<Grocery[]> = new Subject();
  UpdateList$: Subject<any> = new Subject();
  public Glist: Grocery[];
  public NeededOnly: Grocery[] /*= [
    { name: "", moreInformations: [{ bought: false }] }
  ];*/
  formItem: FormGroup;


  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    public auth: AuthenticationService,
    formBuilder: FormBuilder,
    private styler:StylerService
  ) {
    this.formItem = formBuilder.group({
      name: ["", [Validators.required]],
      no: [1, [Validators.required]],
      type: ["", []],
      basic: [false, [Validators.required]]
    });
    this.Loading$.subscribe(l=>this.Loading=l)
    this.UpdateList$.asObservable().subscribe((options) => {
      var now = Date.now() / 1000;
      var diff = now - this.Lastdate;

      let _loading=options?options.Loading:false
      let _refresh=options?options.refresh:false
      let scrollId=options?options.scrollId:""
      if (diff > 1 || this.Lastdate == -1||_refresh) {
        this.Lastdate = Date.now() / 1000;
        this.getList(_loading,scrollId);
      }
    });

    this.showAddCard$.subscribe(s=>this.showAddCard=s)
    this.globalRandom=this.randomStr(5)

  }


  //get isThereNeeded(){ this.NeededOnly.}
  //===== Gets
  getGroceries(): Observable<ResponseDto<Grocery[]>> {
    return this.http.get<ResponseDto<Grocery[]>>(this.URL);
  }

  getGroceryDetails(id: number): Observable<any> {
    return this.http.get<any>(this.URL + "/" + id);
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
          this.snack.open("Faild to connect to the Server", "X");
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
    console.log(groceryDto);

    return this.http.post<ResponseDto<string>>(
      `${this.URL}/request/${req}`,
      groceryDto
    );
  }

  //===== Services
  GetUserIdByGroceryId(ownerid:number): number {
    console.log(ownerid);
    console.log(this.auth.CurrentUser.username);
    
    if (this.auth.CurrentUser.id == ownerid) {
      return this.auth.CurrentUser.id;
    }else{
      return ownerid
    }

  }
  isGroceryNameExsits(name: string) {
    return this.http.post<boolean>(`${this.URL}/nameExists/`, { value: name });
  }

  GuessTimeout(id: number) {
    return this.http.get<any>(`${this.URL}/guess/${id}`);
  }

  //GET All  from Api
  getList(HandlLoading = true,scrollId="") {
    if (HandlLoading) this.Loading$.next(true);
    this.getGroceries().subscribe(
      response => {
        if(scrollId) this.styler.scrollById(scrollId,500);
        if (HandlLoading) this.Loading$.next(false);
        let groceries = response.value;
        if(!this.Glist){
          this.Glist = groceries
        }else{
          console.log("Updatng values");
        //remove deprecated items
          for (let i = 0; i < this.Glist.length; i++) {
            const G = this.Glist[i];
            var IsG = (g)=>{
              return (g.id == G.id&&
                g.moreInformations.length == G.moreInformations.length&&
                g.groceryOrBought == G.groceryOrBought&&
                g.ownerid == G.ownerid)
            };
            var exsists = groceries.find(IsG)?true:false
            if (!exsists) {
              console.log("removed "+i);
              console.log(this.Glist[i]);
              this.Glist.splice(i,1)
            }
          }
          //add deffrent elements only
          for (let i = 0; i < groceries.length; i++) {
            const item = groceries[i];
            var IsG = (g)=>{
              return (g.id == item.id&&
                g.moreInformations.length ==item.moreInformations.length&&
                g.groceryOrBought == item.groceryOrBought&&
                g.ownerid == item.ownerid)
            };
            var exsists = this.Glist.find(IsG)?true:false
            if (!exsists) {
              console.log("added "+i);
              console.log(item);
              
              this.Glist.push(item);
            }
          }
        }

        //Filter to needed only
        var HoldNeeded: Grocery[] = [
          { name: "", moreInformations: [{ bought: false }] }
        ];

        for (let index = 0; index < groceries.length; index++) {
          const item = groceries[index];
          if (item.groceryOrBought) HoldNeeded.push(item);
        }

        HoldNeeded.shift();
        this.NeededOnly = HoldNeeded;
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
      basic:false,
      timeout: 0,
      owner:this.auth.CurrentUser.username,
      groceryOrBought:false
    };
    this.formItem.controls.name.setValue("", [Validators.required]);
    this.formItem.controls.no.setValue(1, [Validators.required]);
    this.formItem.controls.type.setValue("");
    this.formItem.controls.basic.setValue(false);
    this.formItem.enable();
    this.formItem.markAsUntouched();
  }
  ViewIdByname(name){
    name=name.toLowerCase().replace(/[\s ]/g,"");
    return "card"+name+this.globalRandom
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
