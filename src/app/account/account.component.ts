import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DataModelService, syncApp, user } from '../services/datamodel.service';

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
    private route: ActivatedRoute,
    private dataModel: DataModelService){}

  async getUserDetails(){
    const userInfo = await this.dataModel.getUserDetails();
    if(userInfo === undefined){
      this.router.navigate(['/']);
    }else{
      const results = Array.prototype.slice.call(userInfo);
      this.userInfoArray = results;
    }
  }

  async getActiveSession(){
      const user: user = await syncApp.currentUser?.callFunction("getUser") as user;
      if(user === undefined){
        this.router.navigate(['/']);
      }else{
        const userId = user.userID;
      }
  }

  async loadData(){
    const routeParams = this.route.snapshot.paramMap;
    const acctIDFromRoute = routeParams.get('acctID') as string;
    this.getUserDetails();
  }

  ngOnInit(){
    this.titleService.setTitle(this.title);
      this.getActiveSession();
      this.loadData();
  }
}
