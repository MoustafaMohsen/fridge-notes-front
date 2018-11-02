import {trigger,state,style,animate,transition, group,keyframes} from "@angular/animations";
  export const JSONCSS={
    class:{"height_100":style({'height':'100%'}),"height_0":style({'height':0})},
    Animations:{"slideInDown":keyframes([style({'transform':'translate3d(0, -100%, 0)','visibility':'visible','offset':0}),style({'transform':'translate3d(0, 0, 0)','offset':1}),]),"increaseHeight":keyframes([style({'transform':'translateY(100%) scale(0)','opacity':0,'offset':0}),style({'transform':'translateY(0%) scale(1)','opacity':1,'offset':1}),]),"decreaseHeight":keyframes([style({'transform':'translateY(0%) scale(1)','opacity':1,'offset':0}),style({'transform':'translateY(100%) scale(0)','opacity':0,'offset':1})])}
}