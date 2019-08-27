import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmployeeService } from '../services/employee/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEditResolveService implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const param = route.paramMap.get('id');
    if (param === 'new') {
      return false;
    }
    else {
      return this._employeeSerivce.get(param);
    }
  }


  constructor(
    private _employeeSerivce: EmployeeService
  ) { }
}
