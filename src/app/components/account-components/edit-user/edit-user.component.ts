import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthenticationService, UserDto, UpdatePasswordDto, UserService } from '../../../_auth.collection';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm:FormGroup;
  passwordform:FormGroup;
  currentUser:UserDto;
  pfButton:boolean=true;
  usrFBtn:boolean=true;
  constructor(formbuilder:FormBuilder,private auth:AuthenticationService,private user:UserService,
    private snack:MatSnackBar
    ) {

    this.userForm=formbuilder.group({
      username:[""],
      firstname:[""],
      lastname:[""],
      oldpassword:["",[Validators.required]],
      email:["",Validators.email]
    });

    this.passwordform=formbuilder.group({
      oldpassword:["",[Validators.required]],
      newpassword:[""],
      conpassword:[""]
    });

   }//constructor


  ngOnInit() {
    this.currentUser=this.auth.CurrentUser;
    this.f.firstname.setValue(this.auth.CurrentUser.FirstName);
    this.f.lastname.setValue(this.auth.CurrentUser.LastName);
    this.f.username.setValue(this.auth.CurrentUser.UserName);
    this.f.email.setValue(this.auth.CurrentUser.Email);
    this.f.oldpassword.setValue("");
    this.userForm.disable({emitEvent:false});

    this.passwordform.statusChanges.subscribe(d=>{
      let op=this.passwordform.controls['oldpassword'].value?true:false;
      let np=this.passwordform.controls['newpassword'].value?true:false;
      let cp=this.passwordform.controls['conpassword'].value?true:false;   
      let all=!(op&&np&&cp);
      this.pfButton=all
    });

    this.userForm.statusChanges.subscribe(d=>{
      let fn=this.f['firstname'].value != this.currentUser.FirstName;
      let ln=this.f['lastname'].value != this.currentUser.LastName;
      let all=!(fn||ln)
      this.usrFBtn=all;
      /*
      if(all)
        this.f['email'].disable({emitEvent:false})
      */
       //enable password form
       if(all){
         this.userForm.get("oldpassword").enable({emitEvent:false});
       }
    });
    
  }

  get f (){return this.userForm.controls}
  get pf (){return this.passwordform.controls}

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
    if (this.f['oldpassword'].value ==""||this.f['oldpassword'].value==null) {
      this.snack.open(`Please enter your password first`,`X`,{duration:10000});
      this.userForm.get("oldpassword").markAsTouched();
      return;
    }
    this.usrFBtn=true;
    let userdto:UserDto={...this.currentUser};
    userdto.FirstName=this.f['firstname'].value;
    userdto.LastName=this.f['lastname'].value;
    userdto.password=this.f['oldpassword'].value;
    this.user.Update(userdto).subscribe(user=>{
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

  changepassword(){
    if (this.pf['newpassword'].value!=this.pf['conpassword'].value) {
      console.log("incompatiable passwords");
      return ;
    }
    let passdto:UpdatePasswordDto={
      id:this.currentUser.Id,
      oldpassword:this.pf['oldpassword'].value,
      newpassword:this.pf['newpassword'].value
    }
    this.user.ChangePassword(passdto).subscribe(user=>{
      this.auth.updateCurrentUser(true,user.value)
      this.currentUser=user.value;
      this.passwordform.disable({emitEvent:false});
    });

  }//changepassword()

}//class
