import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthenticationService, UserDto, UpdatePasswordDto, UserService } from '../../../../_auth.collection';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-passwrod',
  templateUrl: './change-passwrod.component.html',
  styleUrls: ['./change-passwrod.component.css']
})
export class ChangePasswrodComponent implements OnInit {

  passwordform:FormGroup;
  pfButton:boolean=true;
  currentUser:UserDto;
  IsExternalLogin:boolean=false;
  constructor(
    formbuilder:FormBuilder,
    private router: Router,
    private auth:AuthenticationService,
    private userSrv:UserService,
    private snack:MatSnackBar
    ) {
    this.passwordform=formbuilder.group({
      oldpassword:[""],
      newpassword:["",[Validators.required]],
      conpassword:["",[Validators.required]]
    });

   }//constructor
   get pf (){return this.passwordform.controls}

  ngOnInit() {

    this.currentUser=this.auth.CurrentUser;
    setTimeout(() => {
      this.IsExternalLogin=this.auth.IsExternalLogin;
      if(this.IsExternalLogin){
        this.passwordform.get('oldpassword').setValidators([])
      }else{
        this.passwordform.get('oldpassword').setValidators([Validators.required])
      }
      console.log(this.auth.IsExternalLogin,this.currentUser.externalProvider);
      
    }, 500);

    this.passwordform.statusChanges.subscribe(d=>{
      let op=this.IsExternalLogin?true:(this.passwordform.controls['oldpassword'].value?true:false);
      let np=this.passwordform.controls['newpassword'].value?true:false;
      let cp=this.passwordform.controls['conpassword'].value?true:false;   
      let all=!(op&&np&&cp);
      this.pfButton=all
    });
  }

  changepassword(){
    if (this.pf['newpassword'].value!=this.pf['conpassword'].value) {
      console.log("incompatiable passwords");
      return ;
    }
    let passdto:UpdatePasswordDto={
      id:this.currentUser.Id,
      oldpassword:this.pf['oldpassword'].value,
      newpassword:this.pf['newpassword'].value,
      externalProvider:this.auth.CurrentUser.externalProvider
    }
    this.userSrv.ChangePassword(passdto,this.IsExternalLogin).subscribe(
      user=>{
      this.auth.updateCurrentUser(true,user.value)
      this.currentUser=user.value;
      this.passwordform.disable({emitEvent:false});
    },
    e=>{
      this.snack.open(`${e.error.errors}`)
    }
    );

  }//changepassword()

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.newpassword.value;
    let confirmPass = group.controls.conpassword.value;
    return pass === confirmPass ? null : { notSame: true }     
  }

}//class
