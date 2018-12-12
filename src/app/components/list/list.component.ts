import { Component, OnDestroy, OnInit } from "@angular/core";
import { Grocery } from "../../statics/Grocery";
import { GListService } from "../../Services/g-list.service";
import { ListAnimation,simp,GListAnimation,GListItemAnimation,list, Mylist,working } from "../../animations/animations";
import { trigger,state, style,animate, transition,group,keyframes,query,animateChild,stagger } from "@angular/animations";
//import { jos } from "../myanimations";




@Component({
  selector: "app-g-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  animations: [working]
})
export class ListComponent implements OnInit, OnDestroy {
  //public web;
  constructor(public web: GListService) {}

  NeededOnly: Grocery[] = this.web.NeededOnly;
  Show = false;
  num;
  loaded=false;
  ngOnInit() {

    this.loaded=true;
    var ExcuteOnSuccess=()=>{
      console.log("this.web.Glist");
      
      console.log(this.web.Glist);
      
      if(!this.web.Glist || this.web.Glist.length==0 )
        if(!this.web.showAddCard)
          this.web.clickAddCardButton$.next(true)
    }
    this.web.UpdateList$.next({loading:true,ExcuteOnSuccess:ExcuteOnSuccess});
  }

  testRefresh(num: number, sequential = false) {
    var t0 = performance.now();
    console.log("started", t0);

    let requestNumber = 0;
    var getRequest = (func: Function = null) => {
      this.web.getGroceries().subscribe(
        response => {
          requestNumber++;
          func();
        },
        e => {
          console.log("g-list error");
          console.error(e);
          requestNumber++;
        }
      );
    };

    var batch = () => {
      for (let i = 0; i < num; i++) {
        getRequest(() => {
          console.log(requestNumber);
          if (requestNumber <= num) {
            var t1 = performance.now();
            console.log(
              `${num} Requests took ${t1 - t0}  milliseconds,${(t1 - t0) /
                1000} Secounds, avrage ${(t1 - t0) /
                1000 /
                num} Secound per request`
            );
          }
        });
      }
    };

    var seq = () => {
      var requestnumCheck = () => {
        if (requestNumber <= num) {
          console.log(requestNumber);
          getRequest(requestnumCheck);
        } else {
          var t1 = performance.now();
          console.log(
            `${num} Requests took ${t1 - t0}  milliseconds,${(t1 - t0) /
              1000} Secounds, avrage ${(t1 - t0) /
              1000 /
              num} Secound per request`
          );
        }
      };
      getRequest(requestnumCheck);
    };

    if (seq) {
      seq();
    }
    if (!seq) {
      batch();
    }
  }

  ngOnDestroy() {
    console.log("glist Destroyed");
  }
} //class
