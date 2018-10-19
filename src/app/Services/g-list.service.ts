import { Grocery, ResponseDto } from '../Grocery';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable,Subject, BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import {_BaseUrl} from '../config'
import {  UserDto } from '../_auth.collection/_models/user';
import { AuthenticationService } from '../_auth.collection/_services/authentication.service';

@Injectable()
export class GListService {
URL=`${_BaseUrl}/api/GroceriesApi`;

constructor(private http: HttpClient,public snackBar: MatSnackBar) {

}

Glist$:Subject<Grocery[]>=new Subject();
UpdateList$:Subject<any>=new Subject();
public Glist:Grocery[];
public NeededOnly:Grocery[]=[{ name:'',moreInformations:[{bought:false}]}];


//===== Gets
getGroceries(): Observable<ResponseDto<Grocery[]>>{    
  return this.http.get<ResponseDto<Grocery[]>>(this.URL)
}

getGroceryDetails(id:number): Observable<any>{
  return this.http.get<any>(this.URL +"/"+id);
}

//===== Updates
//this.web.UpdateList$.next();
UpdateStatus(grocery:Grocery,req:string){
  this.http.post(`${this.URL}/request/${req}`,grocery).subscribe(
    (response) =>{
    this.snackBar.open(""+response, "X", {duration: 2000,});
    this.UpdateList$.next();
    },
    (e)=>{
      this.snackBar.open( "Faild to connect to the Server","X" );
   },
   ()=> {console.log("Completed");}

  );//subscirbe
}

//===== Updatessubscribe
request(grocery:Grocery,req:string){
  return this.http.post<ResponseDto<string>>(`${this.URL}/request/${req}` ,grocery)
}


//===== Services
isGroceryNameExsits(name:string){
  return this.http.post<boolean>(`${this.URL}/nameExists/`,{value:name});
}

GuessTimeout(id:number){
  return this.http.get<any>(`${this.URL}/guess/${id}`);
}


}//class
