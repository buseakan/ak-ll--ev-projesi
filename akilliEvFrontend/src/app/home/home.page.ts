import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { DeviceService } from '../services/device.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public devicesService: DeviceService,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    const user: User = JSON.parse(await this.storageService.getUser());
    await this.devicesService.getDevicesByUserId(user.id);
  }
}
