import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'master/product';
  constructor(private _apiService: ApiService) {}

  getProduct(): Observable<any> {
    return this._apiService.observableGet(this.url);
  }
  searchProductByName(searchTerm): Observable<any[]> {
    return this._apiService.observableGet(
      `${this.url}/search[product_name]=${searchTerm}`
    );
  }
}
