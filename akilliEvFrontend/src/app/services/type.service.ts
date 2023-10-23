import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../apiUrl';
import { DeviceType } from '../models/deviceType';
import { ResponseDataModel } from '../models/responseDataModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  apiUrl: string = ApiUrl;
  constructor(
    private http: HttpClient
  ) { }
  getAll() {
    let url = `${this.apiUrl}types`;
    return this.http.get<ResponseDataModel<DeviceType[]>>(url);
  }

  getById(typeId: number) {
    let url = `${this.apiUrl}types/${typeId}`;
    return this.http.get<ResponseDataModel<DeviceType>>(url);
  }

  add(type: DeviceType) {
    let url = `${this.apiUrl}typeadd`;
    return this.http.post<ResponseModel>(url, type);
  }

  update(type: DeviceType) {
    let url = `${this.apiUrl}typeupdate`;
    return this.http.post<ResponseModel>(url, type);
  }

  delete(typeId: number) {
    let url = `${this.apiUrl}typedelete/${typeId}`;
    return this.http.delete<ResponseModel>(url);
  }
}
