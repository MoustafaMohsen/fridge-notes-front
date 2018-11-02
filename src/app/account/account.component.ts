import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../_auth.collection/_services/authentication.service';
import { UserDto, FriendRequestDto, UserFriend } from '../_auth.collection/_models/user';
import { UserService } from '../_auth.collection/_services/user.service';
import { MatSnackBar } from '@angular/material';
import { StylerService } from '../Services/styler.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit,OnDestroy {

  friends:UserFriend[];
  friendCode:string;
  invetationCode:string;
  GenInvitaionBtn:boolean=false;
  AddfriendBtn:boolean=false;
  constructor(private auth:AuthenticationService,private userSrv:UserService,private snack:MatSnackBar
    ,public styler:StylerService) { }

  ngOnInit() {
    this.friends=this.auth.CurrentUser.userFriends
    this.invetationCode="";
  }
  
  DeleteFriend(friend:UserFriend){
    console.log("DeleteFriend()");
    console.log(friend);
    var invCode = friend.friendEncryptedCode;
    let friendRequestDto:FriendRequestDto = {
      invetationCode:invCode,
      userId:this.auth.CurrentUser.id
    }
    console.log(friendRequestDto);
    this.userSrv.DeleteFriendship(friendRequestDto).subscribe(
      f=>{
        this.snack.open(`${f.statusText}`,"x",{duration:3000})
        console.log(f);
        this.updateList(false);
      }
    )
  }

  AddFriend(invCode:string){
    this.AddfriendBtn=true;
    console.log("AddFriend()");
    
    console.log(invCode);
    
    let friendRequestDto:FriendRequestDto = {
      invetationCode:invCode,
      userId:this.auth.CurrentUser.id
    }
    console.log(friendRequestDto);
    
    this.userSrv.AddFriend(friendRequestDto).subscribe(
      f=>{
        this.AddfriendBtn=false;
        this.snack.open(`${f.statusText}`,"x",{duration:3000})
        console.log(f);
        this.updateList(false);
      },
      e=>{
        this.AddfriendBtn=false;
      }
    )
  }
  

  updateList(showSnack=true){
    this.auth.ReAuthenticate().subscribe( (r)=>{
      console.log(r);
      
      if(showSnack){
        this.snack.open(`${r.statusText}`,"x",{duration:3000});
      }
      this.auth.updateCurrentUser(true,r.value)
      this.friends=this.auth.CurrentUser.userFriends

    } )
  }
  
  GenInvitaion(){
    this.GenInvitaionBtn=true;
    var resonse =this.userSrv.GenerateInvitaionCode().subscribe(r=>{
      var code = r.value
      this.invetationCode=code;
      console.log(code);
      this.GenInvitaionBtn=false;
    },
    e=>{
      this.GenInvitaionBtn=false;
    });
  }
  

  pasteTofriendCode(){
    navigator.clipboard.readText()
  .then(text => {
    this.friendCode = text
  })
  .catch(err => {
    // maybe user didn't grant access to read from clipboard
    console.log('Something went wrong', err);
  });
  }

  ngOnDestroy(){
    
  }
}
