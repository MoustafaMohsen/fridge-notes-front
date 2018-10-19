export interface Grocery{

        id?:number;//server
        name:string;//input
        basic?:boolean;//input
        timeout?:number;//input
        moreInformations:MoreInformation[];
        groceryOrBought?:boolean;//server
        owner?:number;
}
export interface MoreInformation {

        moreInformationsId?:number//server
        date?:number        //the date in which the item have been bought or added/Needed to note
        bought:boolean   // false = Need / true=Bought
        lifeTime?:number  //the lifetime number
        //Details
        no?:number 
        typeOfNo ?:string
}


export interface ResponseDto<T>{
        value:T,
        statusText:string
}