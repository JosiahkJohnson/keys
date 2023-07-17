import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataModelService, keyFob } from '../services/datamodel.service';
import { locationIqApiKey, locationIqEndpoint } from '../services/locationiq.service';

@Component({
  selector: 'devicedetails',
  templateUrl: './devicedetails.component.html',
  styleUrls: ['./devicedetails.component.css']
})

export class DeviceDetailsComponent {
  title = "Device Details | Where's My Keys";
  userFobs!: keyFob;
  locationHistoryArray!: any[];
  endpoint = locationIqEndpoint;
  apiKey = locationIqApiKey;
  
  constructor(
    private titleService:Title,
    private route: ActivatedRoute, 
    private dataModel: DataModelService){}

  async getHistory(fobId: string){
    const history = await this.dataModel.getDeviceHistory(fobId);
    const results = Array.prototype.slice.call(history);
    this.locationHistoryArray = results;
  }

  async loadData(){
    const routeParams = this.route.snapshot.paramMap;
    const fobSNFromRoute = routeParams.get('fobSN') as string;
    const fob: keyFob = await this.dataModel.getFob(fobSNFromRoute) as keyFob;
    console.log(fob);
    this.userFobs = fob;
    console.log(this.userFobs?.serialNumber);
    this.getHistory(this.userFobs?.serialNumber as string);
  }

  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.loadData();
  }

}
