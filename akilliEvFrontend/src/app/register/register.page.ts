import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrl } from '../apiUrl';
import { ResponseDataModel } from '../models/responseDataModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';
import { LoadingService } from '../services/loading.service';
import { MessageService } from '../services/message.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  apiUrl: string = ApiUrl;
  registerForm: FormGroup;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rePassword: ["", [Validators.required, Validators.minLength(6)]],
    }, { validators: this.checkPassword })
  }

  async register() {
    if (this.registerForm.valid) {
      await this.loadingService.showLoading("kayıt olunuyor lütfen bekleyiniz");
      this.http.post<ResponseModel>(`${this.apiUrl}kayit`, this.registerForm.value).subscribe(async response => {
        if (response.success) {
          this.messageService.showMessage(response.message);
          setTimeout(() => {
            this.router.navigate(["/login", { email: this.registerForm.get("email").value }])
          }, 500);
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

  checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    return group.get("password").value === group.get("rePassword").value ?
      null :
      { notSame: true };
  }

}
