import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TestMethodsService {

  constructor() { }
  
  getvalidations(rF: FormGroup) {
    console.log("====Validation");
    Object.keys(rF.controls).forEach(key => {
      let controlErrors: ValidationErrors = rF.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log(
            'Key control: "' +
              key +
              '", keyError: "' +
              keyError +
              '", err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
    console.log("Validation====");
  }
}
