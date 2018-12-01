import { Component } from '@angular/core';
import { ToastNotificationService, LoaderService } from './shared/services';
import { Router, RouterEvent, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  config: any;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
  	private toastService: ToastNotificationService,
  ) {
  	// configurations for toaster notifications defined in toaster service.
    this.config = this.toastService.config;
	  this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showLoader();
    }
    if (event instanceof NavigationEnd) {
      this.hideLoader();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.hideLoader();
    }
    if (event instanceof NavigationError) {
      this.hideLoader();
    }
  }

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }
}
