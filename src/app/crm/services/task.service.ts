import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { Observable } from 'rxjs';
import { take, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'crm/task';
  constructor(private apiService: ApiService) {}

  store(resource: any): Promise<any> {
    return this.apiService.post(this.url, resource);
  }

  list(page = 1): Observable<any> {
    return this.apiService
      .observableGet(`${this.url}?page=${page}`)
      .pipe(map((data: any) => (data = data.data)));
  }

  fullList(): Observable<any[]> {
    return this.apiService.observableGet(`${this.url}/full_list`);
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

  markTaskAsDone(taskId): Observable<any> {
    return this.apiService
      .observableGet(`${this.url}/markdone/${taskId}`)
      .pipe(take(1));
  }
}
