import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_auth.collection/_services/authentication.service';
import { UserDto } from '../_auth.collection';
import { Router } from '@angular/router';
import { RolesService } from '../_auth.collection/_services/Roles.service';

@Component({
  selector: 'app-registration-check-emails',
  templateUrl: './registration-check-emails.component.html',
  styleUrls: ['./registration-check-emails.component.css']
})
export class RegistrationCheckEmailsComponent implements OnInit {

  currentuser:UserDto
  constructor(private router: Router,public auth:AuthenticationService,private rolesSrv:RolesService) {
    this.currentuser=auth.CurrentUser;
   }

  async ngOnInit() {
    console.log("updateCurrentUserFromServer()");
    let reponse = await this.auth.updateCurrentUserFromServer();
    let unverified = this.rolesSrv.isUnverified(reponse);
    if (unverified) {
      this.router.navigate(["/"])
    }
    
  }

}
