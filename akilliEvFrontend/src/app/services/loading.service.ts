import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingController: LoadingController
  ) { }

  async showLoading(message?: string) {
    const load = await this.loadingController.create({
      message: message ?? "Yükleniyor...",
      duration: 3000,
      spinner: "dots"
    })

    return await load.present();
  }
  async closeLoad(data?: any) {
    await this.loadingController.dismiss(data);
  }

}
