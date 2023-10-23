import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { LoadingService } from './services/loading.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  async ngOnInit() {
    await this.checkUser();
  }

  async checkUser() {
    const user: User = JSON.parse(await this.storageService.getUser());
    if (user) {
      this.router.navigateByUrl("/home/devices");
    } else {
      this.router.navigateByUrl("/login");
    }
  }
}
