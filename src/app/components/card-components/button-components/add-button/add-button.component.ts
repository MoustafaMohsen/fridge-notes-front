import { Component, OnInit } from '@angular/core';
import { GListService } from '../../../../Services/g-list.service';
import { StylerService } from '../../../../Services/styler.service';
import {trigger,state,style,animate, transition,group,keyframes} from "@angular/animations";
import { plusToCross } from '../../../../animations/animations';

declare var $: any;

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
  animations:[plusToCross]
})
export class AddButtonComponent implements OnInit {

    constructor(public web: GListService,public styler:StylerService) { }

  ngOnInit() {
    this.styler.focusById("home-add-button")
  }
  loadingSpin(){
    let classes={
      "fas":true,
      "fa-plus":true,
      "loading-rotate-start":this.web.Loading,
      "loading-rotate":true,
    }
    return classes;
  }
}
