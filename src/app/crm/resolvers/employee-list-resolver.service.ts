import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { EmployeeService } from '../services/employee/employee.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class EmployeeListResolverService implements Resolve<any[]> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> {
    return this._employeeService.list().pipe(delay(1000));
  }
  constructor(private _employeeService: EmployeeService) {}
}
