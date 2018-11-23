import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//Import Config
import { _BaseUrl } from "../../statics/config";
import { Subject, BehaviorSubject } from 'rxjs';
import { UserDto } from '../_models/user';
import { ResponseDto } from '../../statics/Grocery';

export const _BASEURL = _BaseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  CurrentUser:UserDto={};
  user$:Subject<UserDto>=new Subject();
  BASEURL = _BASEURL;
  constructor(private http:HttpClient) {

    this.user$.subscribe((u)=>{
      this.CurrentUser=u;
    });
    this.updateCurrentUser();

   }//constructor

   updateCurrentUser(sendevent=true,user=null){
     console.log("updateCurrentUser()");
     
    var storageUser =JSON.parse( localStorage.getItem('currentuser') );
    
    if(user){
      localStorage.setItem('currentuser',JSON.stringify(user));
      storageUser =JSON.parse( localStorage.getItem('currentuser') );
      console.log("user");
      console.log(storageUser);
      
    }
    
    if (storageUser && storageUser.token) {
      this.CurrentUser=storageUser;
      console.log("storageUser && storageUser.token");
      console.log(this.CurrentUser);
      
      if(sendevent)
      this.user$.next(storageUser);
    }
    
   }

  login(username:string,password:string){    
    return this.http.post<any>(`${this.BASEURL}/api//users/authenticate`,{username:username,password:password})
    .pipe(map(user=>{

      if (user && user.token) {
        localStorage.setItem('currentuser',JSON.stringify(user));
        this.user$.next(user)

      }

      return user;
    }))
  }

  logout(){
    localStorage.removeItem('currentuser');
  }

  ReAuthenticate(){
     return this.http.get<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/GetUserId`)
  }

}//class
