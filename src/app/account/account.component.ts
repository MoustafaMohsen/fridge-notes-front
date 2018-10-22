import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_auth.collection/_services/authentication.service';
import { UserDto, FriendRequestDto, UserFriend } from '../_auth.collection/_models/user';
import { UserService } from '../_auth.collection/_services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  friends:UserFriend[];
  friendCode:string;
  constructor(private auth:AuthenticationService,private userSrv:UserService,private snack:MatSnackBar) { }

  ngOnInit() {
    this.friends=this.auth.CurrentUser.userFriends
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
    console.log("AddFriend()");
    
    console.log(invCode);
    
    let friendRequestDto:FriendRequestDto = {
      invetationCode:invCode,
      userId:this.auth.CurrentUser.id
    }
    console.log(friendRequestDto);
    
    this.userSrv.AddFriend(friendRequestDto).subscribe(
      f=>{
        this.snack.open(`${f.statusText}`,"x",{duration:3000})
        console.log(f);
        this.updateList(false);
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
    var resonse =this.userSrv.GenerateInvitaionCode().subscribe(r=>{
      var code = r.value
      console.log(code);
      
    });
  }
}
