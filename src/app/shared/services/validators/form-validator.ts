import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {

  constructor() { }

  // get error class when invalid and touched for input fields
  isInvalid(control: AbstractControl) {
    const invalid = control.invalid && ( control.touched || control.dirty );
    return invalid ? 'form-control-danger' : '';
  }

  // mark all controls dirty for a form group (utility methods)
  markControlsTouched(group: any) {
    for (const i in group.controls) {
      group.controls[i].markAsTouched();
      if (group.controls[i] instanceof FormGroup || group.controls[i] instanceof FormArray) {
        this.markControlsTouched(group.controls[i]);
      }
    }
  }

}
