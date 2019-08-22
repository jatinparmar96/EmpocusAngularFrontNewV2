import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { Observable } from 'rxjs';
import { uom } from '../models/uom.model';

@Injectable({
  providedIn: 'root'
})
export class UomService {

  private full_list_url = 'admin/uom_full_list'
  private url = 'admin/uom';
  constructor(
    private apiService: ApiService
  ) { }
  full_list(): Observable<uom[]> {
    return this.apiService.observableGet(this.full_list_url);
  }

  list(page = 1): Observable<uom[]> {
    return this.apiService.observableGet(this.url);
  }
  show(id): Observable<uom> {
    return this.apiService.observableGet(`${this.url}/${id}`);
  }
}
