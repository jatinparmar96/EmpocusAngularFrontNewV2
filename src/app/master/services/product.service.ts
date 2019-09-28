import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'admin/raw_product';
  private full_list = 'admin/raw_product_full_list';
  constructor(private apiService: ApiService) {}

  store(resource: any): Promise<any> {
    return this.apiService.post(this.url, resource);
  }

  list(page = 1): Observable<any> {
    return this.apiService.observableGet(`${this.url}?page=${page}`).pipe(
      take(1),
      map((data: any) => (data = data.data))
    );
  }

  fullList(): Observable<any[]> {
    return this.apiService.observableGet(this.fullList).pipe(take(1));
  }

  get(resource: number): Observable<any> {
    return this.apiService.observableGet(`${this.url}/${resource}`).pipe(
      take(1),
      map((data: any) => (data = data.data))
    );
  }

  searchResourceByName(searchTerm: string): Observable<any[]> {
    return this.apiService
      .observableGet(`${this.url}?search[employee_name]=${searchTerm}`)
      .pipe(
        take(1),
        map((data: any) => (data = data.data))
      );
  }
}
