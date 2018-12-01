import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {}

  public getAll(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(
        map( (response) => {
        return response;
      }), catchError((e: any) => {
        return _throw(e);
      }),
    );
  }

  public getFullResponse(url: string): Observable<HttpResponse<any>> {
    return this.http.get(url, { observe: 'response' })
      .pipe(
        map( (response) => {
        return response;
      }), catchError((e: any) => {
        return _throw(e);
      }),
    );
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post(url, body)
      .pipe(
        map( (response) => {
        return response;
      }), catchError((e: any) => {
        return _throw(e);
      }),
    );
  }

  public put(url: string, body: any): Observable<any> {
    return this.http.put(url, body)
      .pipe(
        map( (response) => {
        return response;
      }), catchError((e: any) => {
        return _throw(e);
      }),
    );
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url)
      .pipe(
        map( (response) => {
        return response;
      }), catchError((e: any) => {
        return _throw(e);
      }),
    );
  }

}
