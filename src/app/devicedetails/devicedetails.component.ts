import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataModelService, keyFob, syncApp, user } from '../services/datamodel.service';
import { locationIqApiKey, locationIqEndpoint } from '../services/locationiq.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../services/modal/modal.component';

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
  modalRef: MdbModalRef<ModalComponent> | undefined

  constructor(
    private titleService:Title,
    private route: ActivatedRoute,
    private router: Router,
    private dataModel: DataModelService,
    private modalService: MdbModalService,
    ){}

  async getHistory(fobId: string){
    const history = await this.dataModel.getDeviceHistory(fobId);
    const results = Array.prototype.slice.call(history);
    this.locationHistoryArray = results;
  }

  async loadData(){
    const routeParams = this.route.snapshot.paramMap;
    const fobSNFromRoute = routeParams.get('fobSN') as string;
    const fob: keyFob = await this.dataModel.getFob(fobSNFromRoute) as keyFob;
    this.userFobs = fob;
    this.getHistory(this.userFobs?.serialNumber as string);
  }

  openModal(imgRef: any) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { imgSrc: imgRef.src }
    });
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
    this.loadData();
  }
}