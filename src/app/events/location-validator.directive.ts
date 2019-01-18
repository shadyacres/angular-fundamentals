import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validateLocation]',
  providers: [ { provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true } ]
})
export class LocationValidator implements Validator {
  validate(control: FormGroup): { [key: string]: any } {
    const addressControl = control.controls['address'];
    const cityControl = control.controls['city'];
    const countryControl = control.controls['country'];
    const onlineUrlControl = (<FormGroup>control.root).controls['onlineUrl'];

    if ((addressControl && addressControl.value && cityControl && cityControl.valid && countryControl && countryControl.value) ||
      (onlineUrlControl && onlineUrlControl.value)) {
      return null;
    }

    return { validateLocation: false };
  }
}

