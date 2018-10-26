import { Component, OnDestroy, OnInit } from "@angular/core";
import { Grocery } from "../Grocery";
import { GListService } from "../Services/g-list.service";
import {trigger,state,style,animate, transition,group,keyframes} from "@angular/animations";

const slidWidth=[trigger('widthSlider',[
  state('true',style({width: '100%!important', padding: '1rem',opacity: '1'})),//start
  state('false',style({width: '0%!important', padding: '0!important',opacity: '0!important'})),//end
  transition('true<=>false',[animate('1000ms',keyframes([
    style({width: '100%!important', padding: '1rem',opacity: '1',offset:0}),//shown
    style({width: '0%!important', padding: '0!important',opacity: '0!important',offset:1}),//hidden
]))])
])]
@Component({
  selector: "app-g-list",
  templateUrl: "./g-list.component.html",
  styleUrls: ["./g-list.component.css"],
  animations:[slidWidth]
})
export class GListComponent implements OnInit, OnDestroy {
  //public web;
  constructor(public web: GListService) {}

  NeededOnly: Grocery[] = this.web.NeededOnly;

  num;
  ngOnInit() {
    this.web.UpdateList$.next();

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
