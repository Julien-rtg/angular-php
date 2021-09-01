import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

    @Input() 
    deviceName?: string;

    @Input()
    deviceStatus?: string;

    constructor() { }

    ngOnInit(): void {
        
    }

    getStatus(){
        return this.deviceStatus;
    }

}
