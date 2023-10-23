import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setUser(data: string) {
    await Storage.set({
      key: StorageEnum.User,
      value: data
    })
  }

  async setUserObject(data: {}) {
    await Storage.set({
      key: StorageEnum.User,
      value: JSON.stringify(data)
    })
  }

  async getUser() {
    const { value } = await Storage.get({
      key: StorageEnum.User
    })
    return value;
  }

  async removeUser() {
    await Storage.remove({
      key: StorageEnum.User
    })
  }
}

export enum StorageEnum {
  User = "akilliev.user"
}
