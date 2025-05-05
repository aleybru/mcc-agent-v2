import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getMyClient() {
    return this.http.get(`${environment.apiUrl}/clients/my`, {
      headers: {
        Authorization: `Bearer ${this.authService.token}`
      }
    });
  }

  createClient(name: string) {
    return this.http.post(`${environment.apiUrl}/clients`, { name }, {
      headers: {
        Authorization: `Bearer ${this.authService.token}`
      }
    });
  }
}
