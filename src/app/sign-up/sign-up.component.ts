import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { pwMatch, pwValidator } from '../custom-validators.directive';
import { syncApp } from '../services/datamodel.service';
import * as Realm from 'realm-web';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  title = "Sign Up | Where's My Keys";

  constructor(
    private titleService:Title,
    private router: Router,
    private formBuilder: FormBuilder){}
    
    signupForm: FormGroup = this.formBuilder.group({
      signupEmail: ['',[Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        pwValidator(/\d/,{hasNumber: true}),
        pwValidator(/[A-Z]/,{hasUppercase: true}),
        pwValidator(/[a-z]/,{hasLowercase: true}),
        pwValidator(/[[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]]/,{hasSpecialCharacter: true}),
        Validators.minLength(8)
      ]],
      confirmPassword: ['', [Validators.required]]
      },
      {
        validators:[pwMatch()]
      });

  async registerUser(email: any, password: any){
    const credentials = Realm.Credentials.emailPassword(email,password);
    await syncApp.emailPasswordAuth.registerUser({email,password});
    const user = await syncApp.logIn(credentials);
    await syncApp.currentUser?.callFunction("linkUser", email);
    this.router.navigate(['../' + user.id + '/devices']);
  }

  ngOnInit(){
    this.titleService.setTitle(this.title);
  }
}
