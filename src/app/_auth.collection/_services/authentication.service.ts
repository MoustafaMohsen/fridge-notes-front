import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//Import Config
import { _BaseUrl } from "../../config";
import { Subject, BehaviorSubject } from 'rxjs';
import { UserDto } from '../_models/user';

export const _BASEURL = _BaseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  CurrentUser:UserDto={};
  user$:Subject<UserDto>=new Subject();
  BASEURL = _BASEURL;
  constructor(private http:HttpClient) {

    let storageUser =JSON.parse( localStorage.getItem('currentuser') );

      if (storageUser && storageUser.token) {
        this.CurrentUser=storageUser;
        this.user$.next(storageUser);
      }
      this.user$.subscribe((u)=>{
        this.CurrentUser=u;
      });

   }//constructor

  login(username:string,password:string){
    console.log(username,password);
    
    return this.http.post<any>(`${this.BASEURL}/api//users/authenticate`,{username:username,password:password})
    .pipe(map(user=>{

      if (user && user.token) {
        console.log(user);
        localStorage.setItem('currentuser',JSON.stringify(user));
        this.user$.next(user)

      }

      return user;
    }))
  }

  logout(){
    localStorage.removeItem('currentuser');
  }

}//class
