import { Component, OnInit } from '@angular/core';
import { GListService } from '../Services/g-list.service';
import { StylerService } from '../Services/styler.service';
import {trigger,state,style,animate, transition,group,keyframes} from "@angular/animations";

declare var $: any;
const plusToCross=[
  trigger('plussToCross',[
    state('true',style({'transform':'rotate(45deg)'})),//when showcard is true
    state('false',style({'transform':'rotate(0deg)'})),
    transition('true<=>false',[
      animate('200ms')
    ])
  ])
];
@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
  animations:[plusToCross]
})
export class AddButtonComponent implements OnInit {

    constructor(public web: GListService,public styler:StylerService) { }

  ngOnInit() {
  }
  loadingSpin(){
    let classes={
      //"fas":true,
      //"fa-ellipsis-v":true,
      "loading-rotate-start":this.web.Loading,
      "loading-rotate":true,
    }
    return classes;
  }
}
