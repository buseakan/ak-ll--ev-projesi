import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController: ToastController
  ) { }

  async showMessage(message: string, position?: MessagePositionType) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position ?? MessagePositionType.Top
    });
    toast.present();
  }
}
export enum MessagePositionType {
  Top = "top",
  Middle = "middle",
  Bottom = "bottom"
}
