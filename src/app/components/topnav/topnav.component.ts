import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../_auth.collection/_services/authentication.service";
import { GListService } from "../../Services/g-list.service";
@Component({
  selector: "app-topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ["./topnav.component.css"],
  animations:[]
})
export class TopnavComponent implements OnInit {
  constructor(public auth: AuthenticationService, private web: GListService) {}
  //JSONCSS=JSONCSS
  ngOnInit() {}

  animate=false



  logoClick(){
    if(this.auth.logged) {
      this.web.UpdateList$.next({ loading: true })
    }
  }
  triggerLoading() {
    if (this.web.Loading == false) {
      this.web.Loading$.next(true);
      console.log(true, "start");
      return;
    }

    if (this.web.Loading == true) {
      this.web.Loading$.next(false);
      console.log(false, "ended");
      return;
    }
  }
}
