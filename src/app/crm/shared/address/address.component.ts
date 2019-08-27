import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() meta = 'defaultAddress';
  constructor(private fb: FormBuilder) {}

  generateAddress(element: any = '') {
    return this.fb.group({
      address_line_1: [element.address_line_1],
      address_line_2: [element.address_line_2],
      city: [element.city],
      state: [element.state],
      pincode: [element.pincode],
      meta: [this.meta]
    });
  }
  ngOnInit() {
    this.parentForm.addControl(this.controlName, this.generateAddress());
  }
}
