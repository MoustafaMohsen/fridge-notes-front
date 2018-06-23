import { Injectable } from '@angular/core';
import { Grocery, MoreInformation } from './Grocery';
import { GListService } from './g-list.service';

@Injectable()
export class FormatService {
  [x: string]: any;

grocery:Grocery;
  constructor(private GListService:GListService) { }



  Tobought( g:Grocery ):Grocery{
    
  if(g.basic){
  }
  else{
    g.timeout=0//to force gussing timeout
  }
  var lastno=g.moreInformations[g.moreInformations.length-1].no;
  var lasttype=g.moreInformations[g.moreInformations.length-1].typeOfNo;

  var Holdmore:MoreInformation={
    no:lastno,
    bought:true,
    typeOfNo:lasttype,
    lifeTime:0,
   // moreInformationsId:null
  };
    g.moreInformations.push(Holdmore);

    //to bought
    g.groceryOrBought=true;

  return g;
  }


Toneed(  g:Grocery,basic:boolean,timeout:number=0,moreInformations:MoreInformation):Grocery{

  var lastno=moreInformations.no;
  var lasttype=moreInformations.typeOfNo;
  g.timeout=0;//to make sure no one add a timeout to a needed item
  var HoldAddmore:MoreInformation={
    no:lastno,
    bought:false,
    typeOfNo:lasttype,
    lifeTime:0,
  //  moreInformationsId:null
  };
    g.moreInformations.push(HoldAddmore);
    //to needed
    g.groceryOrBought=false;
  return g;
  }


Toremove(  g:Grocery)
{//remember to SendDelete() or edit
if (g.moreInformations.length<=1) {
  return g
}
 else{ 
   g.moreInformations.pop()
   console.log(g);
   
   return g;
 }
}

Toadd(g:Grocery,name:string,basic:boolean=false,timeout:number=0,moreInformation:MoreInformation):Grocery{
  g.name=name;
  g.basic=basic;
  g.timeout=0;
  
  g.moreInformations[g.moreInformations.length-1]={
  bought:false,
  no:moreInformation.no,
  typeOfNo:moreInformation.typeOfNo,
  };

  return g;
}

}//class

// <summary>
// Grocery non nullabls
// MoreInformations[ No=1 ,typeOfNo="" , bought =false ,  ] lifetime is a server property only
// Name,basic=false
// If no timeout and basic is true then let the server handls it else just send it as difference not the future
// </summary>
// forntend is the orcestrator and the one who determens the state of grocery before request
// Add,Edit,Needed,Bought,remove all are a single Post method and to determine the state send in parameter[needed,bought,edit,add]
//  
// server dependencies:-
// -Guessing timeout
// -formating timeout to future
// -setting Date and lifetime
// -set lifetime only at bought invoks , set timeout only at needed invoks
// -timeout == 0 then it's not basic
// 
// frontend dependencies
// -forming a request suitable for add,edit,bought,needed
//     -bought =>grocery as it is just add moreinformation at the end of the array containing
//       -[No=last ,typeOfNo=last , bought =true ] To URL/bought
//       
//     -needed =>grocery as [Name=same,basic=input,timout=input(ifbasic)  ] and add moreinformation at the end of the array containing
//       -[No=lastOrinput ,typeOfNo=lastOrinput , bought =false ] To URL/needed
// 
//     -edit =>grocery as [Name=Input,basic=input,timout=input(ifbasic&needed show input else last or 0 if basic=false) ] and  
//       Change moreinformation at the end of the array to [No=input ,typeOfNo=input , bought=holdlast ] 
//       To URL/needed
//       
//     -remove => grocery as if moreinformation.count > 1 then remove last moreinformation and send edit
//         else send DELETE request
//     
//     -add => grocery as [Name=Input,basic=inputOrfalse ,timout=input(if basic show input else 0 if basic=false) ] and  
//       Change moreinformation at the end of the array to [No=inputOr1 ,typeOfNo=inputOr"" , bought=inputOrfalse ] 
//       To URL/add
//  
// -DELETE =>send Delete request conatining id
// 
// 
// <param name="grocery"></param>
// 
// <returns></returns>

//     -bought =>grocery as it is just add moreinformation at the end of the array containing
//       -[No=last ,typeOfNo=last , bought =true ] To URL/bought

//-needed =>grocery as [Name=same,basic=input,timout=input(ifbasic)  ] 
// and add moreinformation at the end of the array containing
//-[No=nput ,typeOfNo=nput , bought =false ] To URL/needed

//edit =>grocery as [Name=Input,basic=input,timout=input(ifbasic&needed show input else last or 0 if basic=false) ] and  
//Change moreinformation at the end of the array to [No=input ,typeOfNo=input , bought=holdlast ] 
//To URL/needed

//-remove => grocery as if moreinformation.count > 1 then remove last moreinformation and send edit
// else send DELETE request

//-add => grocery as [Name=Input,basic=inputOrfalse ,timout=input(if basic show input else 0 if basic=false) ] and  
//Change moreinformation at the end of the array to [No=inputOr1 ,typeOfNo=inputOr"" , bought=inputOrfalse ] 
//To URL/add