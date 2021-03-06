import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, concat, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError,
  map
} from 'rxjs/operators';
import { EmployeeService } from 'app/crm/services/employee/employee.service';

@Component({
  selector: 'app-contact-selector',
  templateUrl: './contact-selector.component.html',
  styleUrls: ['./contact-selector.component.scss']
})
export class ContactSelectorComponent implements OnInit {
  @Input() parentForm: string;
  @Input() controlName: string;
  @Output() value = new EventEmitter();

  contact: Observable<any>;
  contactLoading = false;
  contactInput = new Subject<string>();

  constructor(private _employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadItems();
  }
  private loadItems() {
    this.contact = concat(
      of([]), // default items
      this.contactInput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.contactLoading = true)),
        switchMap(term =>
          this._employeeService.searchEmployeeName(term).pipe(
            catchError(() => of([])), // empty list on error
            map((val: any) => (val = val.data)),
            tap(() => {
              this.contactLoading = false;
            })
          )
        )
      )
    );
  }
}
