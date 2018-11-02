import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { AuthenticationService, UserDto, ChangePassword, UserService } from '../_auth.collection';

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
  constructor(formbuilder:FormBuilder,private auth:AuthenticationService,private user:UserService) {

    this.userForm=formbuilder.group({
      username:[""],
      firstname:[""],
      lastname:[""]
    });

    this.passwordform=formbuilder.group({
      oldpassword:[""],
      newpassword:[""],
      conpassword:[""]
    });

   }//constructor


  ngOnInit() {
    this.currentUser=this.auth.CurrentUser;
    this.f.firstname.setValue(this.auth.CurrentUser.firstname);
    this.f.lastname.setValue(this.auth.CurrentUser.lastname);
    this.f.username.setValue(this.auth.CurrentUser.username);
    this.userForm.disable();

    this.passwordform.statusChanges.subscribe(d=>{
      let op=this.passwordform.controls['oldpassword'].value?true:false;
      let np=this.passwordform.controls['newpassword'].value?true:false;
      let cp=this.passwordform.controls['conpassword'].value?true:false;   
      let all=!(op&&np&&cp);
      this.pfButton=all
    });

    this.userForm.statusChanges.subscribe(d=>{
      let fn=this.f['firstname'].value != this.currentUser.firstname;
      let ln=this.f['lastname'].value != this.currentUser.lastname;
      let all=!(fn||ln)
      this.usrFBtn=all
    })
  }

  get f (){return this.userForm.controls}
  get pf (){return this.passwordform.controls}

  enableControl(control:AbstractControl){
    if (control.disabled) {
      control.enable();
    }else{
      if (control.enabled) {  
        control.disable();
      }
    }
  }//enableControl()

  editUser(){
    this.usrFBtn=true;
    let userdto:UserDto={...this.currentUser};
    userdto.firstname=this.f['firstname'].value;
    userdto.lastname=this.f['lastname'].value;
    this.user.Update(userdto).subscribe(user=>{
      this.usrFBtn=false;
      this.auth.updateCurrentUser(true,user.value)
      this.f['firstname'].setValue(user.value.firstname);
      this.f['lastname'].setValue(user.value.lastname);
      this.currentUser=user.value;
      this.userForm.disable();
    },
    e=>{
      this.usrFBtn=false;
    }
    );
  }

  changepassword(){
    if (this.pf['newpassword'].value!=this.pf['conpassword'].value) {
      console.log("incompatiable passwords");
      return ;
    }
    let passdto:ChangePassword={
      id:this.currentUser.id,
      oldpassword:this.pf['oldpassword'].value,
      newpassword:this.pf['newpassword'].value
    }
    this.user.ChangePassword(passdto).subscribe(user=>{
      this.auth.updateCurrentUser(true,user.value)
      this.currentUser=user.value;
      this.passwordform.disable();
    });

  }//changepassword()

}//class
