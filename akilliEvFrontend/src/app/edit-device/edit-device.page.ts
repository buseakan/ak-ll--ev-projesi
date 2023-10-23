import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Device } from '../models/device';
import { DeviceType } from '../models/deviceType';
import { User } from '../models/user';
import { DeviceService } from '../services/device.service';
import { LoadingService } from '../services/loading.service';
import { MessageService } from '../services/message.service';
import { StorageService } from '../services/storage.service';
import { TypeService } from '../services/type.service';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.page.html',
  styleUrls: ['./edit-device.page.scss'],
})
export class EditDevicePage implements OnInit {

  types: DeviceType[] = [];
  @Input() user: User;
  @Input() device: Device;
  editForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private typeService: TypeService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.getTypes();
    await this.getUser();
    this.createForm();
  }

  async getUser() {
    this.user = JSON.parse(await this.storageService.getUser());
  }
  getTypes() {
    this.typeService.getAll().subscribe(response => {
      if (response.success) {
        this.types = response.data;
      }
    })
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      id: [this.device.id],
      userId: [this.user.id],
      name: [this.device.name, [Validators.required, Validators.maxLength(50)]],
      typeId: [this.device.typeId, [Validators.required]],
      isOpen: [this.device.isOpen, []],
      color: [this.device.color, []],
      volume: [this.device.volume, []],
    })
  }

  async edit() {
    if (this.editForm.valid) {
      await this.loadingService.showLoading("Aygıt düzenleniyor lütfen bekleyiniz.");
      console.log(this.editForm.value)
      this.deviceService.update(this.editForm.value).subscribe(async response => {
        if (response.success) {
          this.messageService.showMessage(response.message);
          setTimeout(async () => {
            await this.deviceService.getDevicesByUserId(this.user.id);
            await this.close(this.editForm.value);
          }, 200);
        } else {
          this.messageService.showMessage(response.message);
        }
        await this.loadingService.closeLoad();
      })
    }
  }

  async close(data?: any) {
    await this.modalController.dismiss(data);
  }

  checkType() {

  }

}
