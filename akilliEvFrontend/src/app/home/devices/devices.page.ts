import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditDevicePage } from 'src/app/edit-device/edit-device.page';
import { Device } from 'src/app/models/device';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { DeviceService } from 'src/app/services/device.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {

  user: User;
  constructor(
    public deviceService: DeviceService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private alertService: AlertService,
    private storageService: StorageService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.getUser();
    await this.getDevices();
  }

  async getUser() {
    this.user = JSON.parse(await this.storageService.getUser());
  }

  async getDevices() {
    await this.deviceService.getDevicesByUserId(this.user.id);
  }

  getColor(device: Device) {
    return `display:inline-block;border-radius:50%;width: 25px;height: 25px;background:${device.color}`
  }

  async editDevice(device: Device) {
    const modal = await this.modalController.create({
      component: EditDevicePage,
      componentProps: { device: device, user: this.user }
    })
    modal.onDidDismiss().then(async value => {
      if (value.data) {
        await this.deviceService.getDevicesByUserId(this.user.id);
      }
    })

    return await modal.present();
  }

  async onOff(device: Device) {
    await this.loadingService.showLoading(`${device.name} cihazınız
    ${device.isOpen ? "kapanıyor" : "açılıyor"}`);
    device.isOpen = device.isOpen ? false : true;
    this.deviceService.update(device).subscribe(async response => {
      if (response.success) {
        this.messageService.showMessage(`
        cihaz başarılı bir şekilde ${device.isOpen == false ? "kapandı" : "açıldı"}
        `);
      } else {
        this.messageService.showMessage(`
        cihaz ${device.isOpen == false ? "kapanırken" : "açılırken"} bir hata meydana geldi
        `);
        device.isOpen = device.isOpen == false ? true : false;
      }
      await this.loadingService.closeLoad();
    })
  }
  async deleteDevice(device: Device) {
    this.alertService.showAlert("Dikkat", `
    ${device.name} bu cihazı kaldırmak istediğinizden emin misiniz?`,
      () => {
        this.messageService.showMessage("Kaldırma işlemi iptal edildi");
      },
      async () => {
        await this.loadingService.showLoading(`${device.name} cihazınız kaldırılıyor`);
        this.deviceService.delete(device.id).subscribe(async response => {
          if (response.success) {
            this.messageService.showMessage(response.message);
            await this.deviceService.getDevicesByUserId(this.user.id);
          } else {
            this.messageService.showMessage("Cihaz kaldırılamadı");
            device.isOpen = device.isOpen == false ? true : false;
          }
          await this.loadingService.closeLoad();
        })
      })
  }

  updateVolume(device: Device) {
    this.deviceService.update(device).subscribe(async response => {

    })
  }
  updateColor(device: Device) {
    this.deviceService.update(device).subscribe(async response => {
      if (response.success) {
        this.messageService.showMessage("Kaydetme başarılı")
      }
    })
  }

}
