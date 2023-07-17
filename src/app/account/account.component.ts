import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataModelService } from '../services/datamodel.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  title = "Account Details | Where's My Keys";
  userInfoArray!: any[];

  constructor(
    private titleService:Title,
    private router: Router, 
    private dataModel: DataModelService){}

  async getUserDetails(){
    const userInfo = await this.dataModel.getUserDetails();
    const results = Array.prototype.slice.call(userInfo);
    this.userInfoArray = results;
  }
  
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.getUserDetails();
  }
}
