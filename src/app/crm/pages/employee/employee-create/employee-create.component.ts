import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from 'app/crm/services/employee/employee.service';
import { NotifyService } from 'app/shared/services/notify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Address, EmployeeContactNumber } from 'app/crm/Models/employee';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
  employee: FormGroup;
  processing = false;
  prefetchPermanentAddress: Address;
  prefetchResidentialAddress: Address;
  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _toaster: NotifyService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.employee = this.fb.group({
      id: ['new', Validators.required],
      employee_name: ['', Validators.required],
      employee_username: ['', Validators.required],
      email: [''],
      employee_contact_numbers: this.fb.array([this.createContactGroup()]),
      address_checkbox: [false],
      employee_adhaar_number: [''],
      aadhar_img: [],
      employee_pan_number: [''],
      bank_name: [''],
      bank_account_number: [''],
      ifsc_code: [''],
      provident_fund_account_number: ['']
    });
  }

  ngOnInit() {
    const employeeDetails = this._activatedRoute.snapshot.data.employee;
    if (employeeDetails) {
      this.patchData(employeeDetails);
    }
  }

  /**
   * Getters for Commonly used Form Controls
   */
  get residentialAddress() {
    return this.employee.controls['residential_address'];
  }

  get permanentAddress() {
    return this.employee.controls['permanent_address'];
  }
  get contactNumbers() {
    return this.employee.controls.employee_contact_numbers as FormArray;
  }
  get checkBoxValue() {
    return this.employee.controls.address_checkbox;
  }
  createContactGroup(element: any = '') {
    return this.fb.group({
      contact_number: [element, Validators.required]
    });
  }

  // Methods For Adding and Removing Contact Groups
  addContact(): void {
    this.contactNumbers.push(this.createContactGroup());
  }
  removeContact(index): void {
    const contact = this.contactNumbers;
    contact.removeAt(index);
    contact.markAsDirty();
    contact.markAsTouched();
  }

  addressEvent(event) {
    if (event.checked) {
      this.prefetchPermanentAddress = this.residentialAddress.value;
    } else {
      this.permanentAddress.reset();
    }
  }

  /**
   * Add or Update and Employee
   * @param employee
   */
  addOrUpdate(employee: FormGroup): void {
    this.processing = true;
    this._employeeService
      .store(employee.value)
      .then((data: any) => {
        if (data.status) {
          this._toaster.success(data.message);
          this.employee.reset();
          this.processing = false;
          this._router.navigate(['/crm', 'employee']);
        }
      })
      .catch((error: any) => {
        console.error(error);
        this.processing = false;
      });
  }

  /**
   * Patch Employee form With Received Employee Data
   * @param employee
   * @method patchData
   * @returns void
   */
  patchData(employee): void {
    this.employee.patchValue({
      id: employee.id,
      employee_name: employee.employee_name,
      employee_username: employee.employee_username,
      email: employee.email,
      employee_adhaar_number: employee.employee_adhaar_number,
      employee_pan_number: employee.employee_pan_number,
      bank_name: employee.bank_name,
      bank_account_number: employee.bank_account_number,
      ifsc_code: employee.ifsc_code,
      provident_fund_account_number: employee.provident_fund_account_number
    });
    this.prefetchResidentialAddress = employee.residential_address[0];
    this.prefetchPermanentAddress = employee.permanent_address[0];
    this.employee.setControl(
      'employee_contact_numbers',
      this.setExistingNumbers(employee.employee_contact_numbers)
    );
  }

  /**
   * Populate FormArray Field Contact Number
   * @param contact_numbers
   * @returns FormArray
   */
  setExistingNumbers(contact_numbers: EmployeeContactNumber[]): FormArray {
    const formArry = new FormArray([]);
    contact_numbers.forEach(element => {
      formArry.push(this.createContactGroup(element.contact_number));
    });
    return formArry;
  }

  /**
   * Method To Show Confirm Dialog Box
   */
  canDeactivate(): boolean {
    if (this.employee.dirty) {
      return true;
    } else {
      return false;
    }
  }
}
