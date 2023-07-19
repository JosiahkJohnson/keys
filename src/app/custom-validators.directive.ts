import { Directive, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { error } from 'jquery';

//Inverted RegEx Validator for Fob Serial Number
export function snValidator(snRegEx: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validSN = !snRegEx.test(control.value);
    return validSN ? {validSN: {value: control.value}} : null;
  }
}

export function pwValidator(pwRegEx: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if(!control.value){
      return null;
    }
    const pwValid = pwRegEx.test(control.value);
    return pwValid ? null: error;
  }
}

export function pwMatch(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const pwControl = formGroup.get('password');
    const pwMatchControl = formGroup.get('confirmPassword');
    const pwValue = pwControl?.value;
    const pwMatchValue = pwMatchControl?.value;

    if(!pwControl || !pwMatchControl){
      return null;
    }
    if(!pwValue){
      return null;
    }
    if(!pwMatchValue){
      return null;
    }
    if(pwMatchValue !== pwValue){
      formGroup.get('confirmPassword')?.setErrors({NoPasswordMatch: true});
    }
    return null;
  }
}

@Directive({
  selector: '[CustomValidators]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorsDirective, multi: true}]
})
export class CustomValidatorsDirective implements Validators {

  @Input('CustomValidators') validSN = '';
  @Input('CustomValidators') validPW = '';
  @Input('CustomValidators') matchingPW = '';

  validateSN(control: AbstractControl): ValidationErrors | null {
    return this.validSN ? snValidator(new RegExp(this.validSN,'g'))(control) : null;
  }

  validatePW(control: AbstractControl): ValidationErrors | null {
    return this.validPW ? pwValidator(new RegExp(this.validPW), error)(control) : null;
  }

  validatePwMatch(control: AbstractControl): ValidationErrors | null {
    return this.matchingPW ? pwMatch()(control) : null ;
  } 
}