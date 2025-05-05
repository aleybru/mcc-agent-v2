import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './app/interceptors/token.interceptor';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { Observable } from 'rxjs';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(  withInterceptors([
      (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
        const token = localStorage.getItem('token');
        const cloned = token
          ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          : req;

        return next(cloned);
      }
    ])),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
