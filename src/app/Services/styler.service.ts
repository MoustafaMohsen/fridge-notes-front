import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylerService {

  constructor() { }
  scrollById(elId:string) {
    setTimeout(() => {
      const elementList = document.querySelectorAll('#' + elId);
      if(elementList.length==0)
        return
      const element = elementList[0] as HTMLElement;
      element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  focusById(elId:string){
    setTimeout(() => {
      const elementList = document.querySelectorAll('#' + elId);
      if(elementList.length==0)
        return
      const element = elementList[0] as HTMLElement;
      element.focus();
    }, 100);
  }
  //
}
