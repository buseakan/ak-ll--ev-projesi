import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDevicePageRoutingModule } from './edit-device-routing.module';

import { EditDevicePage } from './edit-device.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDevicePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditDevicePage]
})
export class EditDevicePageModule {}
