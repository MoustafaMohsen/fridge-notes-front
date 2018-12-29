export class Grocery {
  id?: string; //server
  name: string; //input
  basic?: boolean; //input
  timeout?: number; //input
  moreInformations: MoreInformation[];
  groceryOrBought?: boolean; //server
  owner?: string;
  ownerid?: string;
  category?: string;
}
export class MoreInformation {
  moreInformationsId?: number; //server
  date?: number; //the date in which the item have been bought or added/Needed to note
  bought: boolean; // false = Need / true=Bought
  lifeTime?: number; //the lifetime number
  //Details
  no?: number;
  typeOfNo?: string;
}

export class Keyframe{
  name:string
  frames:{
    name:string
    value:string
  }[]
}


export declare module FramesNameSpace {

  export interface Property {
      name: string;
      value: string;
  }

  export interface OffsetArr {
      percent: number;
      properties: Property[];
  }

  export interface IKeyframe {
      keyframeName: string;
      offsetArr: OffsetArr[];
  }

}