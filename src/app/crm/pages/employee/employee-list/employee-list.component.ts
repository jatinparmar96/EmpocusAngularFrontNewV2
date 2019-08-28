import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationData } from 'app/crm/Models/pagination.model';
import { EmployeeService } from 'app/crm/services/employee/employee.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  page = 1;
  employeeList: any;
  paginationData: PaginationData = null;
  constructor(
    private route: ActivatedRoute,
    private _employeeService: EmployeeService
  ) {
    this.paginationData = this.route.snapshot.data['employeeList'].data;
    this.employeeList = this.paginationData.data;
  }

  ngOnInit() {}
  pageChange(e) {
    this._employeeService
      .list(e)
      .pipe(first())
      .subscribe((data: any) => {
        this.paginationData = data.data;
        this.employeeList = this.paginationData.data;
      });
  }
}
