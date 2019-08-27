import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from 'app/crm/services/employee/employee.service';
import { NotifyService } from 'app/shared/services/notify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactNumber } from 'app/crm/Models/employee';

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
    private _toaster: NotifyService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
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

  ngOnInit() {
    const employeeDetails = this._activatedRoute.snapshot.data.employee;
    if (employeeDetails.data) {
      this.patchData(this._activatedRoute.snapshot.data['employee'].data);
    }
  }
  // Getters For Commonly used Controls
  get residentialAddress() {
    return this.employee.controls['residential_address'];
  }
  get permanentAddress() {
    return this.employee.controls['permanent_address'];
  }
  get contactNumbers() {
    return this.employee.controls.contact_numbers as FormArray;
  }

  createContactGroup(element: any = '') {
    return this.fb.group({
      contact_number: [element, Validators.required]
    });
  }

  // Methods For Adding and Removing Contact Groups
  addContact(): void {
    this.contactNumbers.push(this.createContactGroup());
    console.log(this.contactNumbers.controls);
  }
  removeContact(index): void {
    const contact = this.contactNumbers;
    contact.removeAt(index);
    contact.markAsDirty();
    contact.markAsTouched();
  }
  // Generate Address Form Field
  generateAddress(element: any = '') {
    return this.fb.group({
      address_line_1: [element.address_line_1],
      address_line_2: [element.address_line_2],
      city: [element.city],
      state: [element.state],
      pincode: [element.pincode]
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
      employee_username: '',
      email: employee.email,
      adhar_number: employee.employee_adhaar_number,
      pan_number: employee.employee_pan_number
    });
    this.employee.setControl(
      'permanent_address',
      this.generateAddress(employee.permanent_address[0])
    );
    this.employee.setControl(
      'residential_address',
      this.generateAddress(employee.residential_address[0])
    );
    this.employee.setControl(
      'contact_numbers',
      this.setExistingNumbers(employee.employee_contact_numbers)
    );
  }
  /**
   * Populate FormArray Field Contact Number
   * @param contact_numbers
   * @returns FormArray
   */
  setExistingNumbers(contact_numbers: ContactNumber[]): FormArray {
    const formArry = new FormArray([]);
    contact_numbers.forEach(element => {
      formArry.push(this.createContactGroup(element.contact_number));
    });
    return formArry;
  }
  /**
   *
   */
  canDeactivate(): boolean {
    if (this.employee.dirty) {
      return confirm('Are You Sure you want to Discard the changes?');
    } else {
      return true;
    }
  }
}
