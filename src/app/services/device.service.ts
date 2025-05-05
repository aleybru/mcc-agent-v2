import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  async registerDeviceIfNeeded(client: string, deviceId: string): Promise<void> {
    const apiUrl = environment.apiUrl;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.token}`
    });

    try {
      await this.http.post(`${apiUrl}/devices`, { client }, { headers }).toPromise();
      const toast = await this.toastController.create({
        message: '📲 Dispositivo registrado correctamente',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: '⚠️ Ya está registrado o error en el server',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      console.error('💥 Error al registrar el dispositivo:', error);
    }
  }
}
