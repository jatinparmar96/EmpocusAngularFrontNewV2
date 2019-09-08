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
import { first, debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { NotifyService } from 'app/shared/services/notify.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  page = 1;
  employeeList: any;
  paginationData: PaginationData = {
    current_page: 0,
    data: null,
    first_page_url: '',
    from: 0,
    last_page: 0,
    last_page_url: '',
    next_page_url: null,
    path: '',
    per_page: 0,
    prev_page_url: null,
    to: 0,
    total: 0
  };
  searchTerm: string;
  searchColumn = 'employee_name';
  subscription: Subscription;
  loaded = false;
  searchLoading = false;
  @ViewChild('searchField', { static: true }) searchField: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _toastService: NotifyService
  ) {
    const _employeeList = this.route.snapshot.data['employeeList'];
    if (
      _employeeList != null &&
      _employeeList !== undefined &&
      _employeeList.status !== 0 &&
      _employeeList.data
    ) {
      this.paginationData = _employeeList.data;
      this.employeeList = this.paginationData.data;
      this.loaded = true;
    } else {
      this._toastService.error(_employeeList.statusText);
    }
  }

  ngOnInit() {
    this.loadSearch();
  }
  pageChange(e) {
    this.loaded = false;
    this._employeeService
      .list(e)
      .pipe(first())
      .subscribe((data: any) => {
        this.paginationData = data.data;
        this.employeeList = this.paginationData.data;
        this.loaded = true;
      });
  }
  loadSearch() {
    this.subscription = fromEvent(this.searchField.nativeElement, 'keyup')
      .pipe(
        map((e: any) => (e = e.target.value)),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.updateList(value);
      });
  }
  updateList(value) {
    this.searchLoading = true;
    this._employeeService.searchEmployeeName(value).subscribe(
      (data: any) => {
        if (data !== undefined) {
          this.paginationData = data;
          this.employeeList = this.paginationData.data;
          this.searchLoading = false;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
