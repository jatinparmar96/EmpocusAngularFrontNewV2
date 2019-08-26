import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from 'app/crm/services/employee/employee.service';
import { NotifyService } from 'app/shared/services/notify.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
  employee: FormGroup;
  checkBoxValue: boolean;
  processing = false;
  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _toaster: NotifyService
  ) {}

  ngOnInit() {
    this.employee = this.fb.group({
      id: ['new', Validators.required],
      employee_name: ['', Validators.required],
      employee_username: ['', Validators.required],
      email: [''],
      contact_numbers: this.fb.array([this.createContactGroup()]),
      adhar_number: [''],
      pan_number: [''],
      permanent_address: this.generateAddress(),
      residential_address: this.generateAddress()
    });
  }
  // Getters For Commonly used Controls
  get residentialAddress() {
    return this.employee.controls['residential_address'];
  }
  get contactNumbers() {
    return this.employee.controls.contact_numbers as FormArray;
  }

  createContactGroup() {
    return this.fb.group({
      contact_number: ['', Validators.required]
    });
  }

  // Methods For Adding and Removing Contact Groups
  addContact(): void {
    this.contactNumbers.push(this.createContactGroup());
    console.log(this.contactNumbers.controls);
  }
  removeContact(index): void {
    this.contactNumbers.removeAt(index);
  }
  // Generate Address Form Field
  generateAddress() {
    return this.fb.group({
      address_line_1: [''],
      address_line_2: [''],
      city: [''],
      state: [''],
      pincode: ['']
    });
  }
  addressEvent(event) {
    if (this.checkBoxValue) {
      this.employee.controls['permanent_address'].setValue(
        this.residentialAddress.value
      );
    } else {
      this.employee.controls['permanent_address'].reset();
    }
  }

  addOrUpdate(employee) {
    this.processing = true;
    this._employeeService
      .store(employee.value)
      .then((data: any) => {
        if (data.status) {
          this._toaster.success(data.message);
          this.employee.reset();
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => (this.processing = false));
  }
}
