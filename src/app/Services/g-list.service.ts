import { Grocery } from '../Grocery';
import { Injectable } from '@angular/core';

import { HttpClient  } from '@angular/common/http';

import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

export const BASRURL = "https://linux-docker-4.herokuapp.com/api/GroceriesApi";

@Injectable()
export class GListService {
constructor(private http: HttpClient,public snackBar: MatSnackBar) { }


//===== Gets
getGroceries(): Observable<Grocery[]>{
  return this.http.get<Grocery[]>(BASRURL).pipe(
    map( (response) =>
    { return response}
   )
  );
}
getGroceryDetails(id:number): Observable<any>{
  return this.http.get<any>(BASRURL +"/"+id);
}

//===== Updates
UpdateStatus(grocery:Grocery,req:string){
  console.log("=======>");
  console.log("==Sending UpdateStatus:");
  console.log(req);
  console.log(grocery);
  console.log("==To:");
  console.log(BASRURL+"/request/"+req);
  console.log("<=======");
  this.http.post(BASRURL+"/request/"+req ,grocery).subscribe( (response) =>{ 
    console.log("=======>");
    console.log("==Response:");
    console.log(response);
    console.log("<=======");
    this.snackBar.open(""+response, "X", {duration: 2000,});
    }
  );
}

//===== Services
isGroceryNameExsits(name:string){
  return this.http.get<any>(BASRURL+"/name/"+name);
}

GuessTimeout(id:number){
  return this.http.get<any>(BASRURL+"/guess/"+id);
}


//GetNeeded Only
GetNeededOnly(){  //(click)
  var NeededOnly:Grocery[]=[{ name:'',moreInformations:[{bought:false}]}];
  var HoldNeeded:Grocery[]=[{name:'',moreInformations:[{bought:false, }]}];
  this.getGroceries().subscribe(
    (respnse) => 
    {
      respnse.forEach(item =>{
        if (item.moreInformations[(item.moreInformations.length -1) ].bought)
          HoldNeeded.push(item)
        })
    }
  )
  HoldNeeded.shift();
  NeededOnly=HoldNeeded;
  return NeededOnly;
  }
  

}//class




/*
//Add
addGrocery(item:Grocery):void{
  var theresponse;
  this.http.post(BASRURL ,item).subscribe((response) =>
  { theresponse = response});
  console.log(item);
  console.log(theresponse);
}

Bought(id:number): Observable<any>{
  var url =BASRURL +"/bought/"+id;
  return this.http.get<any>(url);
}
//Edit
editG(index){
  var theresponse;
  this.http.put(BASRURL+"/putedit/"+index.id,index).subscribe((response) =>
  { console.log(response);
    this.snackBar.open(""+response, "X", {
      duration: 2000,
    });
  });
}


//Needed
NeededPost(grocery:Grocery){
  var theresponse;
  this.http.post(BASRURL+"/Needed/" ,grocery).subscribe((response) =>
  { theresponse = response});
  console.log(theresponse);
  
}
//Needed
Needed(id:number,basic:boolean){
  var theresponse;
  this.http.get(BASRURL+"/Needed/"+id+"/"+basic).subscribe((response) =>
  { theresponse = response});
  console.log(theresponse);
  
}
//Delete
removeG(index:number):void{
  var theresponse;
  this.http.delete(BASRURL+"/"+ index).subscribe((response) =>
  { theresponse = response});
}
 * //bought
/*
bought(id:number): Observable<any>{
  var theresponse;
  this.http.get<any>(BASRURL+"/bought/"+id).subscribe(
    (response) =>
    { theresponse = response}
  );
  console.log(theresponse);
}

    // View All:---GET:   api/GroceriesApi
    // Details:----GET:   api/GroceriesApi/5
    // Add:--------POST:  api/GroceriesApi
    // Edit:-------PUT:   api/GroceriesApi/5
    // Delete:-----DELETE:api/GroceriesApi/5
    // Needed:------GET :  api/Grpceries/Needed/5  /1760
    // Bought:-----GET :  api/GroceriesApi/Bought/5
    // Basic:------GET:   api/GroceriesApi/Basic/5
*/
