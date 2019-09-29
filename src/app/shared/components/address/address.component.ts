import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Address } from 'app/crm/Models/employee';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnChanges {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() meta = 'defaultAddress';
  @Input() prefetchedData: Address;
  constructor(private fb: FormBuilder) {}

  generateAddress(element: any = '') {
    return this.fb.group({
      address_line_1: [element.address_line_1],
      address_line_2: [element.address_line_2],
      city: [element.city],
      state: [element.state],
      country: [element.country],
      pincode: [element.pincode],
      meta: [this.meta]
    });
  }
  ngOnInit() {
    this.parentForm.setControl(this.controlName, this.generateAddress());
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.prefetchedData) {
      this.parentForm.setControl(
        this.controlName,
        this.generateAddress(changes.prefetchedData.currentValue)
      );
    }
  }
}
