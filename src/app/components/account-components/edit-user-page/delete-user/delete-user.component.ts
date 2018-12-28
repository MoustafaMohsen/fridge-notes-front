import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../../../../_auth.collection';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private router: Router,
    private auth:AuthenticationService,
    private user:UserService,
    private snack:MatSnackBar
    ) { }

  ngOnInit() {
  }
  DeleteAccount(){
    this.user.DeleteUser().subscribe(u=>{
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
    })
  }
}
