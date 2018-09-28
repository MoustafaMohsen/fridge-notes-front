import { Grocery } from '../Grocery';
import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

//export const BASRURL = "https://linux-docker-4.herokuapp.com/api/GroceriesApi";
//export const BASRURL = "http://localhost:6291/api/GroceriesApi";
export const BASRURL = "https://linux-docker-5.herokuapp.com/api/GroceriesApi";

@Injectable()
export class GListService {
constructor(private http: HttpClient,public snackBar: MatSnackBar) { }

Glist$:Subject<Grocery[]>=new Subject();
UpdateList$:Subject<any>=new Subject();
public Glist:Grocery[];
public NeededOnly:Grocery[]=[{ name:'',moreInformations:[{bought:false}]}];

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
//this.web.UpdateList$.next();
UpdateStatus(grocery:Grocery,req:string){
  this.http.post(BASRURL+"/request/"+req ,grocery).subscribe( (response) =>{ 
    this.snackBar.open(""+response, "X", {duration: 2000,});
    this.UpdateList$.next();
    },
    (e)=>{
      console.log("e");
      this.snackBar.open( "Faild to connect to the Server","X" );
   },
   ()=> {console.log("Completed");}

  );//subscirbe
}

//===== Updatessubscribe
request(grocery:Grocery,req:string){
  return this.http.post(BASRURL+"/request/"+req ,grocery)
}


//===== Services
isGroceryNameExsits(name:string){
  return this.http.get<any>(BASRURL+"/name/"+name);
}

GuessTimeout(id:number){
  return this.http.get<any>(BASRURL+"/guess/"+id);
}

/*
//GetNeeded Only
GetNeededOnly(){  //(click)
  var HoldNeeded:Grocery[]=[{name:'',moreInformations:[{bought:false, }]}];
  this.getGroceries().subscribe(
    (respnse) => 
    //Filter to needed only
    {
      var HoldNeeded:Grocery[]=[{name:'',moreInformations:[{bought:false, }]}];
      respnse.forEach(item =>{
        if (item.moreInformations[(item.moreInformations.length -1) ].bought)
          HoldNeeded.push(item)
        });
      HoldNeeded.shift();
      this.NeededOnly=HoldNeeded;
    }
  )
  

  return this.NeededOnly;
  }
  */

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
