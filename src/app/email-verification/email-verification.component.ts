import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_auth.collection/_services/authentication.service';
import { UserDto, UserService, MyRoles } from '../_auth.collection';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesService } from '../_auth.collection/_services/Roles.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  checkemailMassage:string;
  ConfirmeVerCode:string;
  ConfirmeId:string;
  Htmlmessage:string;
  constructor(private router: Router,private route: ActivatedRoute,
    public auth:AuthenticationService,private rolesSrv:RolesService
    ,private userSrv:UserService,private snack:MatSnackBar) {
      this.checkemailMassage=`Sending Verification ...`;
      this.Htmlmessage=this.checkemailMassage;
    }

  async ngOnInit() {
    await this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.ConfirmeId = params['Id'];
      this.ConfirmeVerCode=params['verCode'];
    });
    if (this.ConfirmeId && this.ConfirmeVerCode) {
      this.Htmlmessage=`Verifing Account...`;
      await this.sendConfirmation().subscribe(
        r=>{
          if (r.isSuccessful) {
            this.Htmlmessage=`Email verified Successfully`;


            this.router.navigate(['/login'])
          }
        },
        e=>{
          this.Htmlmessage=`Email verification failed`;
          console.log(e);
        });
    }
    else{
      this.Htmlmessage=`Bad arguments`
    }
  }//ngOnInit()

  sendConfirmation(){
    return this.userSrv.ConfirmEmailAccount(this.ConfirmeId,this.ConfirmeVerCode);
  }



}//class
