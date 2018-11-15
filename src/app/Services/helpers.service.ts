import { Injectable } from '@angular/core';



@Injectable()
export class HelpersService {

  constructor() { }

  //->Remove
  //Random String Generator
  randomString()
  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text;
  }

  //->list
  PersentageTimeout(timeout):number{
    if (timeout <= 0) return 0;
    var persentage= (Date.now()/1000)/timeout 
    return  persentage;
  }

  //======General

  formatDate(seconds:number):string{
    
    let d = new Date(seconds*1000);
    var dayOfweek;
    if (d.getDay()==0) {dayOfweek="Sunday"}
      if (d.getDay()==1) {dayOfweek="Monday"}
      if (d.getDay()==2) {dayOfweek="Tuesday"}
      if (d.getDay()==3) {dayOfweek="Wednesday"}
      if (d.getDay()==4) {dayOfweek="Thursday"}
      if (d.getDay()==5) {dayOfweek="Friday"}
      if (d.getDay()==6) {dayOfweek="Saturday"}

    var Month;
    if (d.getMonth()==0) {Month="January"}
      if (d.getMonth()==1) {Month="February "}
      if (d.getMonth()==2) {Month="March"}
      if (d.getMonth()==3) {Month="April"}
      if (d.getMonth()==4) {Month="May"}
      if (d.getMonth()==5) {Month="June"}
      if (d.getMonth()==6) {Month="July"}
      if (d.getMonth()==7) {Month="August"}
      if (d.getMonth()==8) {Month="September"}
      if (d.getMonth()==9) {Month="October"}
      if (d.getMonth()==10) {Month="November"}
      if (d.getMonth()==11) {Month="December"}
    var day=(d.getDate()+1);

    var myDate =  dayOfweek+", "+Month+" " +day;
    return myDate
  }





  //Less Usefull
  

  SecondsToDate(inseconds):string{
    var days = Math.floor(inseconds / ( 60 * 60 * 24));
    var hours = Math.floor((inseconds % ( 60 * 60 * 24)) / ( 60 * 60));
    var minutes = Math.floor((inseconds % ( 60 * 60)) / ( 60));
    var seconds = Math.floor((inseconds % ( 60)) );
    return days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
  }

  SecondsToDaysandHours(inseconds:number){
    var days = Math.floor(inseconds / ( 60 * 60 * 24));
    var hours = Math.floor((inseconds % ( 60 * 60 * 24)) / ( 60 * 60));
    return days + "d " + hours + "h "
  }
  
  SecondsToString(inseconds):string{
    var days = Math.floor( inseconds / ( 60 * 60 * 24) );
    var hours = Math.floor( (inseconds % ( 60 * 60 * 24)) / ( 60 * 60));
    var minutes = Math.floor( (inseconds % ( 60 * 60)) / ( 60));
    var seconds = Math.floor( (inseconds % ( 60)) );
    return days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
  }


  DaysToSeconds(D:number){
    return D*3600*24
  }

  SecondsToDays(s: number): string {
    if (s < 3600 * 24) {
      if (s < 3600) {
        if (s < 60) {
          return "" + Math.floor(s) + " secounds !";
        }

        return "" + Math.floor(s / 60) + " Minutes";
      }

      return "" + Math.floor(s / (60 * 60)) + " Hours";
    }
    return "" + Math.floor(s / (3600 * 24)) + " Days";
  }

 SecodsToDate(inseconds:number){
  var year = Math.floor( inseconds / 3.154e+7 )
  var month = Math.floor( inseconds / 2.628e+6 )
  var day = Math.floor( inseconds / ( 60 * 60 * 24) );
  var hour = Math.floor( (inseconds % ( 60 * 60 * 24)) / ( 60 * 60));
  var minute = Math.floor( (inseconds % ( 60 * 60)) / ( 60));
  var second = Math.floor( (inseconds % ( 60)) );

  if (year>0)
    return `${year} Years`;
  if (month>0)
    return `${month} Month`;
  if (day>0)
    return `${day} Day`;
  if (hour>0)
    return `${hour} Hours, ${minute} Minutes`; 
  if (minute>0)
    return `${minute} Minutes, ${second} Seconds`;  
  if (second>0)
    return `${second} Seconds`;
    
 }
  
}//class
