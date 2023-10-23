import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController
  ) { }

  async showAlert(header: string, message: string, cancelCallBack?: () => void, okCallBack?: () => void) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            if (cancelCallBack)
              cancelCallBack();
          }
        }, {
          text: 'Tamam',
          id: 'confirm-button',
          handler: () => {
            if (okCallBack)
              okCallBack();
          }
        }
      ]
    });

    await alert.present();
  }
}
