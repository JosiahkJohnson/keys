import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataModelService,syncApp, user } from '../services/datamodel.service';
import { FormControl, Validators } from '@angular/forms';
import { activeUser } from '../nav/nav.component';
import { snValidator } from '../custom-validators.directive';

@Component({
  selector: 'device-registration',
  templateUrl: './device-registration.component.html',
  styleUrls: ['./device-registration.component.css']
})

export class DeviceRegistrationComponent {  
  title = "Device Registration | Where's My Keys";

    deviceName = new FormControl('', [Validators.required,Validators.minLength(3)]);
    model = new FormControl('', Validators.required);
    serialNumber = new FormControl('', [Validators.required, snValidator(/^(WMK\d{9})$/g)]);

  constructor(
    private titleService:Title,
    private router: Router,
    private dataModel: DataModelService
  ){}

  async getActiveSession(){
    const user: user = await syncApp.currentUser?.callFunction("getUser") as user;
    if(user === undefined){
      this.router.navigate(['/']);
    }else{
      const userId = user.userID;
    }
  }

  async registerDevice(){
    var deviceName: string = this.deviceName.value as string;
    var model: string = this.model.value as string;
    var serialNumber: string = this.serialNumber.value as string;

  await this.dataModel.addDevice(deviceName,model,serialNumber)
    ?.then(() => this.router.navigate(['../' + activeUser + '/devices']));
  }

  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.getActiveSession();
  }
}
