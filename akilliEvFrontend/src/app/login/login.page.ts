import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrl } from '../apiUrl';
import { ResponseDataModel } from '../models/responseDataModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';
import { LoadingService } from '../services/loading.service';
import { MessageService } from '../services/message.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  apiUrl: string = ApiUrl;
  email: string = "";
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getEmil();
    this.createForm();
  }

  getEmil() {
    this.activatedRoute.params.subscribe(param => {
      if (param["email"]) {
        this.email = param["email"];
      }
    })
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  async login() {
    if (this.loginForm.valid) {
      await this.loadingService.showLoading("giriş yapılıyor lütfen bekleyiniz");
      this.http.post<ResponseDataModel<User>>(`${this.apiUrl}giris`, this.loginForm.value).subscribe(async response => {
        if (response.success) {
          this.messageService.showMessage(response.message);
          await this.storageService.setUserObject(response.data);
          setTimeout(() => {
            this.router.navigateByUrl("/home/devices");
          }, 700);
        } else {
          this.messageService.showMessage(response.message);
        }
        await this.loadingService.closeLoad();
      }, async responseErr => {
        this.messageService.showMessage("Bilinmeyen bir hata meydana geldi");
        await this.loadingService.closeLoad();
      })
    }
  }

}
