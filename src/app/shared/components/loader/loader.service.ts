import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from './loader-model';
@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  // Method to start/ show loader
  show() {
    console.log('start');
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  // Method to stop/ hide loader
  hide() {
    console.log('stop');
    this.loaderSubject.next(<LoaderState>{ show: false });
  }

}
