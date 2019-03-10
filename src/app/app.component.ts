import { Component, OnInit, AfterViewInit, AfterViewChecked } from "@angular/core";
import { GoogleService } from "./services/google.service";
import { AnalyticsId } from "./statics/config";
declare var $ :any;

@Component({
  selector: "app-root",
  templateUrl:'app.component.html'
})
export class AppComponent implements OnInit,AfterViewInit{
  title = "app";
  constructor(private googleServ:GoogleService){

  }
  ngOnInit(): void {
      this.googleServ.Script(AnalyticsId);
  }



  ngAfterViewInit(){
  }

}//class