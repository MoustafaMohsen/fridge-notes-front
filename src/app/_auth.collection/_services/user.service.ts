import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {_BASEURL} from '../_services/authentication.service';
import { UserDto, FriendRequestDto, UserFriend, UpdatePasswordDto } from '../_models/user';
import { ResponseDto } from 'src/app/statics/Dto';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  BASEURL = _BASEURL;
  constructor(private http:HttpClient) { }

  GetAll(){
    return this.http.get<UserDto[]>(`${this.BASEURL}/api/users`)
  }
  
  GetById(){
    return this.http.get<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/GetUserId`);
  }

  Update(user:UserDto){
    return this.http.put<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/editUser`,user);
  }

  ChangePassword(passDto:UpdatePasswordDto){
    return this.http.put<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/changepassword`,passDto);
  }

  Delete(id:number){
    return this.http.delete<any>(`${this.BASEURL}/api/users/deleteuser/${id}`)
  }

  Register(user:UserDto){
    return this.http.post(`${this.BASEURL}/api/users/register`,user)
  }

  
  GenerateInvitaionCode(){
    return this.http.get<ResponseDto<string>>(`${this.BASEURL}/api/users/generateinvitation`)
  }

  AddFriend(FriendRequestDto:FriendRequestDto){
    return this.http.post<ResponseDto<UserFriend>>(`${this.BASEURL}/api/users/addfriend`,FriendRequestDto)
  }

  DeleteFriendship(FriendRequestDto:FriendRequestDto){
    return this.http.post<ResponseDto<UserFriend>>(`${this.BASEURL}/api/users/deletefriendship`,FriendRequestDto)
  }
  
}//class
