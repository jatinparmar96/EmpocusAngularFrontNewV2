import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EmployeeService } from '../services/employee/employee.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeListResolverService implements Resolve<any[]> {
  resolve(): any | Observable<any> {
    return this._employeeService.list().pipe(
      catchError((error: any) => {
        return of(error);
      })
    );
  }
  constructor(private _employeeService: EmployeeService) {}
}
