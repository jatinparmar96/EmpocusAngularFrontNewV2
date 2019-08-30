import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NotifyService } from 'app/shared/services/notify.service';
import {
  trigger,
  style,
  state,
  transition,
  animate
} from '@angular/animations';
import { Address } from 'app/crm/Models/employee';
import { LeadService } from 'app/crm/services/lead.service';
import { Router } from '@angular/router';

const LeadDummyData = JSON.parse(
  `{
  "lead_data": {
    "id": "new",
    "company_name": "Bitmanity LLP",
    "source": "web",
    "assigned_to": {
      "id": 3
    },
    "lead_status": "",
    "product": {
      "id": 9
    },
    "contact_persons": [
      {
        "name": "Jatin Parmar",
        "email": "jatinparmar96@gmail.com",
        "designation": "Co-Founder",
        "primary_contact_number": "8329628990",
        "secondary_contact_number": "9028605003"
      },
      {
        "name": "Rehman Deraiya",
        "email": "rehmanity@gmail.com",
        "designation": "Co-Founder",
        "primary_contact_number": "4123231412",
        "secondary_contact_number": "123124141"
      }
    ],
    "company_info": {
      "company_employee_number": "100",
      "company_annual_revenue": "300",
      "company_website": "bitmanity.com",
      "company_phone": "984618461",
      "company_industry_type": "Technology",
      "company_business_type": "Software Business"
    },
    "social": {
      "facebook_link": "/bitmanity",
      "twitter_link": "/twitter",
      "linkedin_link": "/linked_in"
    },
    "deal": {
      "deal_name": "",
      "deal_value": "",
      "deal_expected_close_date": "",
      "deal_product": ""
    },
    "source_info": {
      "campaign": "Campaign 1",
      "medium": "Field Visit",
      "keyword": "None"
    },
    "address": {
      "address_line_1": null,
      "address_line_2": null,
      "city": null,
      "state": null,
      "pincode": null
    }
  }
}
`
);

@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.scss'],
  animations: [
    trigger('fade', [
      state(
        'void, hidden',
        style({
          opacity: '0',
          transform: 'scale(1)'
        })
      ),
      transition('void => *', [
        animate(
          '300ms ease-in',
          style({
            opacity: '1'
          })
        )
      ]),
      transition('* => void', [
        animate(
          '300ms ease-out',
          style({
            opacity: '0.0',
            transform: 'scale(0.3)'
          })
        )
      ])
    ])
  ]
})
export class LeadCreateComponent implements OnInit {
  active = 'today';
  prefetchedAddress: Address;
  lead_data: FormGroup;
  isProcessing = false;
  constructor(
    private leadService: LeadService,
    private fb: FormBuilder,
    private notifyService: NotifyService,
    private _router: Router
  ) {
    this.lead_data = this.fb.group({
      id: ['new', Validators.required],
      company_name: ['', Validators.required],
      source: ['', Validators.required],
      assigned_to: ['', Validators.required],
      lead_status: ['', Validators.required],
      product: ['', Validators.required],
      contact_persons: this.fb.array([this.createContactGroup()]),
      address: [],
      company_info: this.fb.group({
        company_employee_number: [''],
        company_annual_revenue: [''],
        company_website: [''],
        company_phone: [''],
        company_industry_type: [''],
        company_business_type: ['']
      }),
      social: this.fb.group({
        facebook_link: [' '],
        twitter_link: [''],
        linkedin_link: ['']
      }),
      deal: this.fb.group({
        deal_name: [''],
        deal_value: [''],
        deal_expected_close_date: [''],
        deal_product: ['']
      }),
      source_info: this.fb.group({
        campaign: [''],
        medium: [''],
        keyword: ['']
      })
    });
  }
  createContactGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: [''],
      primary_contact_number: ['', Validators.required],
      secondary_contact_number: ['']
    });
  }
  addContactGroup() {
    this.contactsFormArray.push(this.createContactGroup());
    console.log({ formArray: this.contactsFormArray });
  }
  removeContact(index) {
    this.contactsFormArray.removeAt(index);
  }
  // All the getters to the form
  get companyName() {
    return this.lead_data.controls.company_name;
  }
  get contactsFormArray() {
    return this.lead_data.controls.contact_persons as FormArray;
  }
  ngOnInit() {
    this.lead_data.patchValue(LeadDummyData.lead_data);
  }
  getData(id: any) {
    // TODO
  }
  addOrUpdate(lead) {
    this.isProcessing = true;
    console.log(lead);
    // post request
    this.leadService
      .store(lead.value)
      .then(data => {
        const result: any = data;
        // success
        this.isProcessing = false;
        if (result.status) {
          this.notifyService.show(
            {
              title: 'Success',
              message: result.message
            },
            'success'
          );
          this._router.navigate(['/crm', 'lead']);
        } else {
          this.notifyService.show(
            {
              title: 'Error',
              message: result.message
            },
            'error'
          );
        }
      })
      .catch(error => {
        this.isProcessing = false;
        const errors: any = error;
      });
  }

  canDeactivate() {
    if (this.lead_data.dirty) {
      return true;
    } else {
      return false;
    }
  }
}
