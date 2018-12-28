import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../../../../_auth.collection';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/Services/helpers.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  TheRandomString: string=this.helper.randomString();
  removeIdConfirm:string="#"+this.TheRandomString;
  removeConfirmForId:string=this.TheRandomString;

  btnClicked=false;
  constructor(
    private router: Router,
    private auth:AuthenticationService,
    private user:UserService,
    private snack:MatSnackBar,
    private helper:HelpersService
    ) { }

  ngOnInit() {
  }
  DeleteAccount(){
    this.btnClicked=true
    this.user.DeleteUser().subscribe(u=>{
      this.btnClicked=false
      console.log("==DeleteUser()");
      console.log(u);
      console.log("DeleteUser()==");
      
      this.snack.open(`${u.statusText}`,"X",{duration:5000})
      if (u.isSuccessful) {
        console.log("logout");
        this.auth.logout();
        console.log("navigate");  
        this.router.navigate([""]);
      }
    },
    e=>{
      let error = e.error?e.error.errors:"Delete Error"
      this.snack.open(`${error}`,"X",{duration:5000})
      this.btnClicked=false
    })
  }
}
