import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

// export const address = 'http://127.0.0.1:8000/api/';
// export const address= 'http://clarusinfo.com/apis/public/api/';
// export const address = 'http://roksoindia.com/empocus/apis/public/api/';

export const address = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  post(url, data) {
    return new Promise((resolve, reject) => {
      return this.http
        .post(address + url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('x-auth-token')}`
          }
        })
        .subscribe(
          (dataa: any) => {
            resolve(dataa);
          },
          error => {
            reject(error);
          }
        );
    });
  }
  get(url) {
    return new Promise((resolve, reject) => {
      return this.http
        .get(address + url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('x-auth-token')
          }
        })
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }
  observableGet(url): Observable<any> {
    return this.http
      .get(address + url, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('x-auth-token')
        }
      })
      .pipe(
        catchError((error: any) => {
          if (error.status === 401) {
            localStorage.removeItem('x-auth-token');
            location.reload();
          } else {
            return throwError(error);
          }
        })
      );
  }
}
