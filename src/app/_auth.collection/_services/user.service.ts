import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _BaseUrl } from "../../statics/config";
import { UserDto, FriendRequestDto, UserFriend, UpdatePasswordDto } from '../_models/user';
import { ResponseDto } from 'src/app/statics/Dto';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  BASEURL = _BaseUrl;
  googleUrl = 
  //the authentication url
  "https://accounts.google.com/o/oauth2/auth?"+

  // the client id
  "client_id=" +  "939531348067-qr1133hdu7q4i9bpcke2hraetj5e49td.apps.googleusercontent.com&"+

  // the redirect uri
  "redirect_uri=" +  this.AppHost + "/external-google&"+

  //the scope of information
  "scope="+"email profile&"+

  //the response type
  "response_type="+"code&"

  FacebookUrl = "https://www.facebook.com/v2.11/dialog/oauth?"+
  "client_id=436896383512845&"+
  "scope="+"email&"+
  "redirect_uri="  +  this.AppHost +"/external-facebook&"+
  "response_type="+"code&"

  constructor(private http:HttpClient) { }

  get AppHost():string{
    var protocol = location.protocol;
    var slashes = protocol.concat("//");
    return slashes.concat(window.location.hostname);
  }

  GetAll(){
    return this.http.get<UserDto[]>(`${this.BASEURL}/api/users`)
  }
  
  GetById(){
    return this.http.get<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/GetUserId`);
  }

  Update(user:UserDto,force:boolean=false){
    return this.http.put<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/editUser?force=${force}`,user);
  }
  DeleteUser(){
    return this.http.delete<ResponseDto<boolean>>(`${this.BASEURL}/api/users/DeleteUser`);
  }

  ChangePassword(passDto:UpdatePasswordDto,force:boolean=false){
    return this.http.put<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/changepassword?force=${force}`,passDto);
  }

  Register(user:UserDto){
    return this.http.post<any>(`${this.BASEURL}/api/users/register`,user)
  }

  
  GenerateInvitaionCode(){
    return this.http.get<ResponseDto<string>>(`${this.BASEURL}/api/users/generateinvitation`)
  }

  ConfirmEmailAccount(Id:string,vercode:string){
    let params = `Id=${Id}&verCode=${vercode}`;
    return this.http.get<ResponseDto<string>>(`${this.BASEURL}/api/verification/verifyemail?${params}`)
  }

  SendEmailVerification(Id:string){
    let params = `Id=${Id}`;
    return this.http.get<ResponseDto<string>>(`${this.BASEURL}/api/verification/sendverifyemail?${params}`)
  }

  AddFriend(FriendRequestDto:FriendRequestDto){
    return this.http.post<ResponseDto<UserFriend>>(`${this.BASEURL}/api/users/addfriend`,FriendRequestDto)
  }

  DeleteFriendship(FriendRequestDto:FriendRequestDto){
    return this.http.post<ResponseDto<UserFriend>>(`${this.BASEURL}/api/users/deletefriendship`,FriendRequestDto)
  }
  
}//class
