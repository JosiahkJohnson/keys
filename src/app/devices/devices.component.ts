import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as Realm from 'realm-web';
import { DataModelService, keyFob } from '../services/datamodel.service';
import * as $ from "jquery";

//create an interface for the device object
interface Device {
  name: string;
  deviceID: string;
  location: string;
}

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})


export class DevicesComponent {
  title = "Device Overview | Where's My Keys";
  //wmk_sync = Realm.App.getApp('wmk_sync-kmfbs');
  //currentUser = this.wmk_sync.currentUser?.id;

  userFobs!: any[];

  constructor(
    private titleService:Title,
    private router: Router,
    private dataModel: DataModelService,
    ){}

    async GetDevices(){
      const devices: keyFob = await this.dataModel.getDevices() as keyFob;
      const results = Array.prototype.slice.call(devices);
      this.userFobs = results;
    }

  /*the div we are adding devices to is called device-container
/It should go as follows:
The outside loop should add rows on the page inside of the container
the inner loop will add devices in columns called cols within the rows created by the outer loop
after four cols are added, the outer loop iterates again and creates another row to add more devices

Each device has a name and date with a click action to be added later
the last device in the last column of the last row will have a button with a plus sign in it instead indicating a new device
can be added */



  //test button
  //const $button = $("#test");
  /*devices: Device[] = [
    {
      name: 'placeholder',
      deviceID: 'today',
      location: '',
    },
    {
      name: 'placeholder two',
      deviceID: 'tomorrow',
      location: '',
    },
    {
      name: 'placeholder three',
      deviceID: 'the day after',
      location: '',
    },
    {
      name: 'placeholder',
      deviceID: 'today',
      location: '',
    },
    {
      name: 'placeholder two',
      deviceID: 'tomorrow',
      location: '',
    },
    {
      name: 'placeholder three',
      deviceID: 'the day after',
      location: '',
    },
  ];*/

  //method will be called to redraw all the items on the page
  draw() {
    var deviceArray = this.userFobs;

    //console.log("function called");
    //outer loop will add rows with four columns in each
    for (var i = 0; i < deviceArray.length; i += 4) {
      //div that represents the row and will contain the columns
      const row = $('<div>');
      //pointer to the container we will ultimately add this row to
      const $container = $('.device-container');

      //add the proper class for bootstrap
      row.addClass('row align-items-center');
      $container.append(row);

      console.log('i = ' + i);
      //begin the inner loop now to add the columns
      //this loop will add all of the items and the data
      for (var x = i; x < i + 4; x++) {
        if (deviceArray.length - x == 0) {
          break;
        }

        //div that represents each individual device which will be the columns
        const contain = $('<div>');
        const device = $('<div>');

        //insert the data here and append it to the device div
        const name = $('<div>');
        const deviceID = $('<div>');
        const model = $('<div>');

        //seperate the rows of data within device
        name.addClass('row');
        deviceID.addClass('row');
        model.addClass('row');

        //add the data
        $('<p>' + deviceArray[x].deviceName + '<p>').appendTo(device);
        $('<p>' + deviceArray[x].serialNumber + '<p>').appendTo(device);
        $('<p>' + deviceArray[x].model + '<p>').appendTo(device);

        //add class that makes it the correct size
        device.addClass('bg-info device');
        contain.addClass('col-3 individual-device');

        contain.append(device);
        row.append(contain);

        //console.log("x = " + x);
      }
    }
  }

  
  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.GetDevices().then(() => {
      this.draw();
    });
  }
  
}
