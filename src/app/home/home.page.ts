import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Device } from '@capacitor/device';
import { DeviceService } from '../services/device.service';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  deviceId: string = 'Cargando...';
  isOnline: boolean = false;
  pendingMessages: any[] = [];

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private clientService: ClientService,
    private deviceService: DeviceService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const client = await this.clientService.getMyClient(); // llamada al backend
  
      if (!client) {
        this.router.navigateByUrl('/client');
        return;
      }
  
      //const deviceId = await this.deviceService.getDeviceId(); // método que obtiene el ID único
      //this.loadDeviceId();
      //await this.deviceService.registerDeviceIfNeeded(client,this.deviceId);
  
      // aquí ya podés hacer el fetch de mensajes o lo que siga
    } catch (error) {
      console.error('Error en el flujo de Home:', error);
    }
  }
  
  async loadDeviceId() {
    try {
      const info = await Device.getId();
      this.deviceId = info.identifier;
  
      //this.deviceService.registerDeviceIfNeeded(this.deviceId);
  
    } catch (err) {
      this.deviceId = 'No disponible';
      console.error('❌ Error al obtener device ID:', err);
    }
  }

  checkServerStatus() {
    this.http.get('http://localhost:5000/api/ping').subscribe({
      next: () => this.isOnline = true,
      error: () => this.isOnline = false
    });
  }

  loadPendingMessages() {
    this.pendingMessages = [
      { id: 1, recipient: '095123456', body: 'Hola mundo!' },
      { id: 2, recipient: '095987654', body: 'Te esperamos' },
    ];
  }

  async registerDevice() {
    const toast = await this.toastController.create({
      message: `Dispositivo ${this.deviceId} registrado 🧾`,
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }
  
}
