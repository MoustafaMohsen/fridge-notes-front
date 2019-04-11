import { Component, OnInit, AfterViewInit, AfterViewChecked } from "@angular/core";
import { GoogleService } from "./services/google.service";
import { AnalyticsId } from "./statics/config";
import { environment } from '../environments/environment';

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
    if (environment.production) {
      this.googleServ.Script(AnalyticsId);
    } else {
      console.log("Development mode")
    }
  }



  ngAfterViewInit(){
  }

}//class