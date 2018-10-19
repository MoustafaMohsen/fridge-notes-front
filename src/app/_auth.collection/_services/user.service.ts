import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {_BASEURL} from '../_services/authentication.service';
import { UserDto } from '../_models/user';
import { ResponseDto } from '../../Grocery';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  BASEURL = _BASEURL;
  constructor(private http:HttpClient) { }

  GetAll(){
    return this.http.get<UserDto[]>(`${this.BASEURL}/api/users`)
  }
  
  GetById(id:number){
    return this.http.get<UserDto[]>(`${this.BASEURL}/api/users/${id}`);
  }

  Update(user:UserDto){
    return this.http.put<any>(`${this.BASEURL}/api/users/`,user);
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
  
}//class
