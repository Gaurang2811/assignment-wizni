import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ToastNotificationService } from '../app/toaster.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoaderService } from '../../components/loader/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private notifyService: ToastNotificationService,
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.showLoader();

    request = request.clone({
      url: environment.baseUrl + request.url,
    });

    return next.handle(request)
    .pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.hideLoader();
          // do stuff with response if you want
          // console.log('successfully authenticated (y)')
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.hideLoader();
          if (err.status === 401 || err.status === 403) {
            console.log('Unauthorized, We have decided to kick you out');
            alert('You don\'t have permission to view this page');
          } else if (err.status === 429) {
            console.log(err.error.message);
          }
          this.notifyService.showToast('Error', err.error.err, 'error');
        }
      }),
    );
  }

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }

}
