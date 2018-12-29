import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthenticationService, UserDto, UpdatePasswordDto, UserService } from '../../../../_auth.collection';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-section',
  templateUrl: './edit-user-section.component.html',
  styleUrls: ['./edit-user-section.component.css']
})
export class EditUserSectionComponent implements OnInit {
  
  userForm:FormGroup;
  currentUser:UserDto;
  usrFBtn:boolean=true;
  IsExternalLogin:boolean=false;
  constructor(
    formbuilder:FormBuilder,
    private router: Router,
    private auth:AuthenticationService,
    private user:UserService,
    private snack:MatSnackBar
    ) 
    {
      this.userForm=formbuilder.group({
        username:[""],
        firstname:[""],
        lastname:[""],
        oldpassword:["",[Validators.required]],
        email:["",Validators.email]
    });

   }//constructor
   get f (){return this.userForm.controls}
  ngOnInit() {
    this.currentUser=this.auth.CurrentUser;
    this.f.firstname.setValue(this.auth.CurrentUser.FirstName);
    this.f.lastname.setValue(this.auth.CurrentUser.LastName);
    this.f.username.setValue(this.auth.CurrentUser.UserName);
    this.f.email.setValue(this.auth.CurrentUser.Email);
    this.f.oldpassword.setValue("");
    this.userForm.disable({emitEvent:false});

    setTimeout(() => {
      this.IsExternalLogin=this.auth.IsExternalLogin;
      if(this.IsExternalLogin){
        this.userForm.get('oldpassword').setValidators([]);
      }else{
        this.userForm.get('oldpassword').setValidators([Validators.required]);
      }
      console.log(this.auth.IsExternalLogin,this.currentUser.externalProvider);
    }, 500);

    this.userForm.statusChanges.subscribe(d=>{
      let fn=this.f['firstname'].value != this.currentUser.FirstName;
      let ln=this.f['lastname'].value != this.currentUser.LastName;
      let all=!(fn||ln)
      this.usrFBtn=all;
       if(all&&!this.IsExternalLogin){
         this.userForm.get("oldpassword").enable({emitEvent:false});
       }
    });
    
  }//ngOnInit

  enableControl(control:AbstractControl,enableAnyway:boolean){
    if(enableAnyway){
      control.enable({emitEvent:false});
      return;
    }
    if (control.disabled) {
      control.enable({emitEvent:false});
    }else{
      if (control.enabled) {  
        control.disable({emitEvent:false});
      }
    }
  }//enableControl()
  
  editUser(){
    //check that password was entered 
    if (!this.IsExternalLogin&&(this.f['oldpassword'].value ==""||this.f['oldpassword'].value==null)) {
      this.snack.open(`Please enter your password first`,`X`,{duration:10000});
      this.userForm.get("oldpassword").markAsTouched();
      return;
    }
    this.usrFBtn=true;
    let userdto:UserDto={...this.currentUser};
    userdto.FirstName=this.f['firstname'].value;
    userdto.LastName=this.f['lastname'].value;
    userdto.password=this.f['oldpassword'].value;
    userdto.externalProvider=this.currentUser.externalProvider;
    console.log("sending");
    console.log(userdto);
    
    this.user.Update(userdto,this.IsExternalLogin).subscribe(user=>{
      this.snack.open(`${user.statusText}`,`X`,{duration:10000});
      console.log("Update");
      console.log(user);
      
      this.usrFBtn=false;
      this.auth.updateCurrentUser(true,user.value)
      this.f['firstname'].setValue(user.value.FirstName);
      this.f['lastname'].setValue(user.value.LastName);
      this.currentUser=user.value;
      this.userForm.disable({emitEvent:false});
    },
    e=>{
      this.snack.open(`Error:${e.errors.errors}`,`X`,{duration:10000});
      this.usrFBtn=false;
    }
    );
  }

  resetEditUser(){
    this.f['firstname'].setValue(this.currentUser.FirstName);
    this.f['lastname'].setValue(this.currentUser.LastName);
    this.usrFBtn=true;
  }

  updateList(showSnack=true){
    this.auth.ReAuthenticate().subscribe( 
      (r)=>{
        console.log(r);
        if(showSnack){
          this.snack.open(`${r.statusText}`,"x",{duration:3000});
        }
        if(r.isSuccessful){
          this.auth.updateCurrentUser(true,r.value);
        }
      },
      (e)=>{
        this.snack.open(`${e.error.errors}`,"x",{duration:3000});
      }
    )
  }
}
