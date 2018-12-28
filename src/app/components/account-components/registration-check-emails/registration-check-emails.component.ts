import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_auth.collection/_services/authentication.service';
import { UserDto, UserService, MyRoles } from '../../../_auth.collection';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesService } from '../../../_auth.collection/_services/Roles.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-registration-check-emails',
  templateUrl: './registration-check-emails.component.html',
  styleUrls: ['./registration-check-emails.component.css']
})
export class RegistrationCheckEmailsComponent implements OnInit {

  checkemailMassage:string;
  ConfirmeVerCode:string;
  ConfirmeId:string;
  currentuser:UserDto;
  Htmlmessage:string;

  constructor(private router: Router,private route: ActivatedRoute,
    public auth:AuthenticationService,private rolesSrv:RolesService
    ,private userSrv:UserService,private snack:MatSnackBar) {
    this.currentuser=auth.CurrentUser;
    this.checkemailMassage=`Please Check Your email <h3>${this.currentuser.Email}</h3> to Complete registration, Make sure to check spam folder too
    
    `
   }


  async ngOnInit() {

    console.log("updateCurrentUserFromServer()");
    this.RestartUserFromServer(MyRoles.unverfied,"/",this.currentuser);

  }//ngInit()

  RestartUserFromServer(role:string,naviagte:string,userdro:UserDto){
    let reponse =  this.auth.updateCurrentUserFromServer();
    let interv = setInterval(d=>{
      if(reponse.closed){
        console.log("reponse.closed",userdro);
        
        let hasRole = this.rolesSrv.hasRole(userdro,role);
  
        if (hasRole) 
          this.Htmlmessage=this.checkemailMassage;
        else
          this.router.navigate([naviagte]);

        clearInterval(interv);
      }
    },500);
  }

}//class