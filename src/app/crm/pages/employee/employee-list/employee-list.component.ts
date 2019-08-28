import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationData } from 'app/crm/Models/pagination.model';
import { EmployeeService } from 'app/crm/services/employee/employee.service';
import {
  first,
  debounceTime,
  map,
  tap,
  distinctUntilChanged,
  take
} from 'rxjs/operators';
import { Observable, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  page = 1;
  employeeList: any;
  paginationData: PaginationData = null;
  searchTerm: string;
  searchColumn = 'employee_name';
  subscription: Subscription;
  @ViewChild('searchField', { static: true }) searchField: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private _employeeService: EmployeeService
  ) {
    this.paginationData = this.route.snapshot.data['employeeList'].data;
    this.employeeList = this.paginationData.data;
  }

  ngOnInit() {
    this.loadSearch();
  }
  pageChange(e) {
    this._employeeService
      .list(e)
      .pipe(first())
      .subscribe((data: any) => {
        this.paginationData = data.data;
        this.employeeList = this.paginationData.data;
      });
  }
  loadSearch() {
    this.subscription = fromEvent(this.searchField.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.updateList(value);
      });
  }
  updateList(value) {
    this._employeeService
      .searchEmployeeName(value)
      .pipe(take(1))
      .subscribe((data: any) => {
        this.paginationData = data;
        this.employeeList = this.paginationData.data;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
