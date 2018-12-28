import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../../_auth.collection/_services/authentication.service';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})
export class FacebookLoginComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snake:MatSnackBar,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    let p = this.activatedRoute.snapshot.queryParamMap;
    console.log(p);
    var code = p.get('code');
    if (code) {
      console.log("== Code Provided==");
      console.log(code);
      this.loginWithFacebook(code);
    }else{
      console.log("==No Code Provided==");
      this.router.navigate([''])
      console.log(code);
    }

  }

  loginWithFacebook(code){
    console.log("===code");
    console.log(code);
    console.log("code===");
    
    this.authenticationService.loginWithFacebook(code).subscribe(
      u=>{
        console.log(u);
        this.snake.open(`${u.statusText}`,`x`,{duration:5000})
        if (u.isSuccessful) {
          this.router.navigate(['']);
        }
      },
      e=>{
        if(e&&e.error)
        this.snake.open(`${e.error.errors}`,`x`,{duration:5000});
        this.router.navigate(['']);
      }
    );
  }//loginwithFacebook

}
