import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit {
  @Input() lead_id;
  contact: FormGroup;
  processing = false;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.contact = this.fb.group({
      lead_id: [this.lead_id, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: [''],
      primary_contact_number: ['', Validators.required],
      secondary_contact_number: ['']
    });
  }
  storeContact() {
    this.processing = true;
    console.log(this.contact.value);
  }
}
