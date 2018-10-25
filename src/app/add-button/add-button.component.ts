import { Component, OnInit } from '@angular/core';
import { GListService } from '../Services/g-list.service';
import { StylerService } from '../Services/styler.service';
declare var $: any;

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
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
