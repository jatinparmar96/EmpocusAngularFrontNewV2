import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// export const address = 'http://127.0.0.1:8000/api/';
export const address =
  'https://salesmultiplier.in/apis/EmpocusApisV2/public/api/';
// export const address= 'http://clarusinfo.com/apis/public/api/';
// export const address = 'http://roksoindia.com/empocus/apis/public/api/';

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
    return this.http.get(address + url, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('x-auth-token')
      }
    });
  }
}
