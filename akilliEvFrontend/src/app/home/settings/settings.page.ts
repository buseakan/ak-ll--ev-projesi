import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  async logOut() {
    this.alertService.showAlert("Uyarı",
      "Çıkış yapmak istediğinizden emin misiniz?",
      async () => {
        this.messageService.showMessage("Çıkış işlemi iptal edildi.");
      },
      async () => {
        await this.loadingService.showLoading("Çıkış yapılıyor lütfen bekleyiniz.");
        await this.storageService.removeUser();
        setTimeout(async () => {
          this.router.navigateByUrl("/login");
          this.messageService.showMessage("Çıkış başarılı");
          await this.loadingService.closeLoad();
        }, 500);
      })
  }

}
