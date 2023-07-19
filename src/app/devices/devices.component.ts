import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataModelService, keyFob, syncApp, user } from '../services/datamodel.service';

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})

export class DevicesComponent {
  title = "Device Overview | Where's My Keys";
  userFobs!: any[];

  constructor(
    private titleService:Title,
    private router: Router,
    private dataModel: DataModelService,
    ){}

  async GetDevices(){
    const devices: keyFob = await this.dataModel.getDevices() as keyFob;
    if(devices === undefined){
      this.router.navigate(['/']);
    }else{
      const results = Array.prototype.slice.call(devices);
      this.userFobs = results;
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
  
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.getActiveSession();
    this.GetDevices();
  }
}
