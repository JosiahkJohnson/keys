import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  title = "Sign Up | Where's My Keys";

  constructor(private titleService:Title){}
  ngOnInit(){
    this.titleService.setTitle(this.title);
  }
}
