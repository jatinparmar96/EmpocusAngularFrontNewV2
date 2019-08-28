import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { Employee } from 'app/crm/Models/employee';
import { Observable, of } from 'rxjs';
import { retry, take, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = `crm/employee`;
  constructor(private apiService: ApiService) {}

  store(employee: Employee): Promise<any> {
    return this.apiService.post(this.url, employee);
  }

  list(page = 1): Observable<any> {
    return this.apiService.observableGet(`${this.url}?page=${page}`);
  }

  fullList(): Observable<Employee[]> {
    return this.apiService.observableGet(`${this.url}/full_list`);
  }

  get(employee: number): Observable<any> {
    return this.apiService.observableGet(`${this.url}/${employee}`).pipe(
      take(1),
      map((data: any) => (data = data.data))
    );
  }
}
