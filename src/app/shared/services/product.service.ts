import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'admin/raw_product';
  constructor(private _apiService: ApiService) {}

  getProduct(): Observable<any> {
    return this._apiService.observableGet(this.url);
  }
  searchProductByName(searchTerm): Observable<any[]> {
    return this._apiService
      .observableGet(`${this.url}?search[product_name]=${searchTerm}`)
      .pipe(map((data: any) => (data = data.data)));
  }
}
