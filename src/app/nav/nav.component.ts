import { Component } from '@angular/core';

export const navlinks = [
  {name: 'Home', path:"/"},
  {name: 'Account', path:"../account"},
  {name: 'Devices', path:"../devices"}
]

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  navlink = navlinks;
}
