import { Component, OnDestroy, OnInit } from "@angular/core";
import { Grocery } from "../Grocery";
import { GListService } from "../Services/g-list.service";

@Component({
  selector: "app-g-list",
  templateUrl: "./g-list.component.html",
  styleUrls: ["./g-list.component.css"]
})
export class GListComponent implements OnInit, OnDestroy {
  //public web;
  constructor(public web: GListService) {}

  NeededOnly: Grocery[] = this.web.NeededOnly;

  num;
  ngOnInit() {}

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
