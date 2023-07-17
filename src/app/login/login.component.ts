import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as Realm from 'realm-web';
import { syncApp } from '../services/datamodel.service';

export class Login{
  public email!: string;
  public password!: string;
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  title = "Sign In | Where's My Keys";
  login = new Login();

  constructor(private titleService:Title,private router: Router){}
  
  ngOnInit(){
    this.titleService.setTitle(this.title);
  }

  async loginEmailPassword(email:string,password:string) {

    // Create an email/password credential
    const credentials = Realm.Credentials.emailPassword(email, password);
    // Authenticate the user
    const user = await syncApp.logIn(credentials);
    console.assert(user.id === syncApp.currentUser?.id);

    const userStatus = syncApp.currentUser?.isLoggedIn;
    if(userStatus === true){
      this.router.navigate(['../account'])
    }else{
      alert("Sign in failed.");
    }
    
    return;  
 
  }

  onSubmit(form: any) {
    this.loginEmailPassword(this.login.email,this.login.password);
  }
}