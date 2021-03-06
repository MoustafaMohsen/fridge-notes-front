import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//Import Config
import { _BaseUrl } from "../../statics/config";
import { Subject, BehaviorSubject } from 'rxjs';
import { UserDto, LoginUserDto } from '../_models/user';
import { ResponseDto } from 'src/app/statics/Dto';
import { RolesService } from './Roles.service';

export const _BASEURL = _BaseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  CurrentUser:UserDto=new UserDto();
  user$:Subject<UserDto>=new Subject();
  BASEURL = _BASEURL;
  loggedin:boolean;
  constructor(private http:HttpClient) {

    this.user$.subscribe((u)=>{
      this.loggedin=this.validUser(u)
      this.CurrentUser=u;
    });
    this.updateCurrentUser();

   }//constructor


   get logged ():boolean{
    return this.validUser(this.CurrentUser)
   }


   get IsExternalLogin():boolean{
     if(this.CurrentUser)
      return !!this.CurrentUser.externalProvider
    return false;
   }

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

  updateCurrentUserFromServer(){
    console.log("updateCurrentUserFromServer()");
    
    if (Object.keys(this.CurrentUser).length ===0) {
      console.error("User Dto is null in service");
      console.log(this.CurrentUser);
      return null;
    }
    return this.ReAuthenticate().subscribe(
      (r)=>{
        console.log(r);
        if(r.isSuccessful){
          this.updateCurrentUser(true,r.value);
        }
      },
      (e)=>{
        console.log(e);
      }
    );    
  }

  login(usernameOrEmail:string,password:string){
    var LoginInfo :LoginUserDto = {password,usernameOrEmail}  
    return this.http.post<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/login`,LoginInfo)
    .pipe(map(response=>{

      var user = response.value
      if (user && user.token) {
        localStorage.setItem('currentuser',JSON.stringify(user));
        this.CurrentUser = user;
        this.user$.next(user)

      }

      return response;
    }))
  }
  loginWithGoogle(code:string){
    return this.http.post<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/external-google?code=${code}`,{})
    .pipe(map(response=>{

      var user = response.value
      if (user && user.token && response.isSuccessful) {
        localStorage.setItem('currentuser',JSON.stringify(user));
        this.CurrentUser = user;
        this.user$.next(user)

      }

      return response;
    }))
  }

  loginWithFacebook(code:string){
    return this.http.post<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/external-facebook?code=${code}`,{})
    .pipe(map(response=>{

      var user = response.value
      if (user && user.token && response.isSuccessful) {
        localStorage.setItem('currentuser',JSON.stringify(user));
        this.CurrentUser = user;
        this.user$.next(user)

      }

      return response;
    }))
  }

  validUser(u:UserDto){
    let result = u&&u.token&&Object.keys(u).length !==0;
    return result;
  }

  logout(){
    localStorage.removeItem('currentuser');
    this.CurrentUser=new UserDto();
    this.user$.next(new UserDto());
  }

  ReAuthenticate(){
     return this.http.get<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/GetUserId`)
  }

}//class
