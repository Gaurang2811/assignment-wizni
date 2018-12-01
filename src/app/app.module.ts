import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ToasterModule } from 'angular2-toaster'; // Toaster Module
import { NgxPaginationModule } from 'ngx-pagination'; // Pagination Module

import { SharedModule } from './shared/shared.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const httpInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    ToasterModule.forRoot(),
    SharedModule.forRoot(),
  ],
  providers: [
    httpInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
