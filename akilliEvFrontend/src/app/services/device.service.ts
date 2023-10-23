import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../apiUrl';
import { Device } from '../models/device';
import { ResponseDataModel } from '../models/responseDataModel';
import { ResponseModel } from '../models/responseModel';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  public devices: Device[] = [];
  apiUrl: string = ApiUrl
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  async getDevicesByUserId(userId: number) {
    await this.loadingService.showLoading("Aygıtlarınız tekrardan bulunuyor...")
    let url = `${this.apiUrl}devices/${userId}`;
    return this.http.get<ResponseDataModel<Device[]>>(url).subscribe(async response => {
      if (response.success) {
        this.devices = response.data;
      }
      await this.loadingService.closeLoad();
    })
  }

  getById(deviceId: number) {
    let url = `${this.apiUrl}device/${deviceId}`;
    return this.http.get<ResponseDataModel<Device>>(url);
  }

  add(device: Device) {
    let url = `${this.apiUrl}deviceadd`;
    return this.http.post<ResponseModel>(url, device);
  }

  update(device: Device) {
    let url = `${this.apiUrl}deviceupdate`;
    return this.http.post<ResponseModel>(url, device);
  }

  delete(deviceId: number) {
    let url = `${this.apiUrl}devicedelete/${deviceId}`;
    return this.http.delete<ResponseModel>(url);
  }
}
