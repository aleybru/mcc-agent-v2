import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private devUrl = environment.apiUrl;
  private prodUrl = environment.apiUrl;

  token: string | null = null;

  constructor(private http: HttpClient) {}

  async login(username: string, password: string, mode: 'dev' | 'prod') {
    const url = mode === 'dev' ? this.devUrl : this.prodUrl;

    try {
      const res: any = await this.http.post(url, { username, password }).toPromise();
      if (res && res.token) {
        this.token = res.token;
        localStorage.setItem('token', res.token);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }
}
