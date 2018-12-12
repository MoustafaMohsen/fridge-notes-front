import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//Import Config
import { _BaseUrl } from "../../statics/config";
import { Subject, BehaviorSubject } from 'rxjs';
import { UserDto, LoginUserDto } from '../_models/user';
import { ResponseDto } from 'src/app/statics/Dto';

export const _BASEURL = _BaseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  CurrentUser:UserDto=new UserDto();
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

   async updateCurrentUserFromServer():Promise<UserDto>{
    if (Object.keys(this.CurrentUser).length ===0) {
      console.error("User Dto is null in service");
      console.log(this.CurrentUser);
      return null;
    }
    await this.ReAuthenticate().subscribe( 
      (r)=>{
        console.log(r);
        if(r.isSuccessful){
          this.updateCurrentUser(true,r.value);
          return r.value
        }
      },
      (e)=>{
        console.log(e);
      }
    );
  }

  login(usernameOrEmail:string,password:string){
    var LoginInfo :LoginUserDto = {password,usernameOrEmail}  
    return this.http.post<ResponseDto<UserDto>>(`${this.BASEURL}/api//users/login`,LoginInfo)
    .pipe(map(response=>{

      var user = response.value
      if (user && user.token) {
        localStorage.setItem('currentuser',JSON.stringify(user));
        this.user$.next(user)

      }

      return response;
    }))
  }

  logout(){
    localStorage.removeItem('currentuser');
  }

  ReAuthenticate(){
     return this.http.get<ResponseDto<UserDto>>(`${this.BASEURL}/api/users/GetUserId`)
  }

}//class
