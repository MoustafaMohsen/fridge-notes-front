import { Component, OnInit } from "@angular/core";
declare const $:any;
@Component({
  selector: "app-root",
  template: `
    <div class="container-fluid">
      <div class="row no-gutters mar--15">
      <div class="col-12">
        <app-topnav></app-topnav>
        <div id="body-container">
          <router-outlet ></router-outlet>
        </div>
      </div>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  title = "app";
  ngOnInit(): void {

    console.log("======Body Hieght")
    console.log("body-container",)
    console.log("Body Hieght======")
  }
  
}
