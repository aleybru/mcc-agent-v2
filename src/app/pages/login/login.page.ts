import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule]
})
export class LoginPage {

  loginForm: FormGroup;
  mode: 'dev' | 'prod' = 'dev';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      username: ['aleybru@gmail.com', [Validators.required, Validators.email]],
      password: ['Brunito.286', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    try {
      const success = await this.authService.login(username, password, this.mode);
      if (success) {
        this.navCtrl.navigateRoot('/home');
      } else {
        this.showToast('Credenciales inválidas');
      }
    } catch (err) {
      this.showToast('Error de conexión');
    }
  }

  private async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
