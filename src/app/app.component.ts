import { Component, OnInit, AfterViewInit, AfterViewChecked } from "@angular/core";
import * as $ from 'jquery'
@Component({
  selector: "app-root",
  templateUrl:'app.component.html'
})
export class AppComponent implements OnInit,AfterViewInit{
  title = "app";
  ngOnInit(): void {
  }



  ngAfterViewInit(){
  }

}//class