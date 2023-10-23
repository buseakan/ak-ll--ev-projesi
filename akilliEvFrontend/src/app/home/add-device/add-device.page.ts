import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceType } from 'src/app/models/deviceType';
import { User } from 'src/app/models/user';
import { DeviceService } from 'src/app/services/device.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {

  types: DeviceType[] = [];
  user: User;
  addForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private typeService: TypeService,
    private router: Router
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
    this.addForm = this.formBuilder.group({
      userId: [this.user.id],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      typeId: ["", [Validators.required]],
    })
  }

  async add() {
    if (this.addForm.valid) {
      await this.loadingService.showLoading("Aygıt ekleniyor lütfen bekleyiniz.");
      console.log(this.addForm.value)
      this.deviceService.add(this.addForm.value).subscribe(async response => {
        if (response.success) {
          this.messageService.showMessage(response.message);
          setTimeout(async () => {
            await this.deviceService.getDevicesByUserId(this.user.id);
            this.router.navigateByUrl("/home/devices");
          }, 200);
        } else {
          this.messageService.showMessage(response.message);
        }
        await this.loadingService.closeLoad();
      })
    }
  }

  checkType() {
    const typeId = this.addForm.get("typeId").value;
    if (typeId == 1) {
      this.addForm.get("name").setValue("Samsung 50Q67A");
    }
    if (typeId == 2) {
      this.addForm.get("name").setValue("Philips Hue");
    }
    if (typeId == 3) {
      this.addForm.get("name").setValue("Xiaomi Mi Home Security Camera");
    }
    if (typeId == 4) {
      this.addForm.get("name").setValue("Samsung HW-T400 SoundBar");
    }
  }

}
