import { Component } from '@angular/core';
import { syncApp, user } from '../services/datamodel.service';
import { Router } from '@angular/router';

export const activeUser = syncApp.currentUser?.id;

export const navlinks = [
  {name: 'Home', path:'../' + activeUser + '/devices'},
  {name: 'Account', path:'../' + activeUser + '/account'}
]

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  navlink = navlinks;

  constructor( private router: Router){}

  async logout(){
    const user: user = await syncApp.currentUser?.callFunction("getUser") as user;
    const userId: string = user.userID as string;
    const userStatus = syncApp.currentUser?.state as string;
    console.log(user.userID);
    console.log(userStatus);
    await syncApp.currentUser?.logOut().then(() => {
      const userState = syncApp.allUsers[userId].state;
      if(userState === "logged-out"){
        this.router.navigate(['/']);
      }else{
        alert("Sign-off failed.");
      }
    })
  }
}
