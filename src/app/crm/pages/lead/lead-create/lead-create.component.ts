import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'app/shared/services/notify.service';
import {
  trigger,
  style,
  state,
  transition,
  animate,
  query
} from '@angular/animations';

@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.scss'],
  animations: [
    trigger('fade', [
      state(
        'void, hidden',
        style({
          transform: 'scale(0) translateY(100%)'
        })
      ),
      transition('void => *', [
        animate(
          '300ms ease',
          style({
            transform: 'scale(1) translateY(0)'
          })
        )
      ]),
      transition('* => void', [
        animate(
          '300ms ease-out',
          style({
            'background-color': 'red',
            opacity: '0.5',
            transform: 'scale(0.3) translateY(-100%)'
          })
        )
      ])
    ])
  ]
})
export class LeadCreateComponent implements OnInit {
  active = 'today';
  lead_data: FormGroup;
  Lead: FormGroup;
  formTouched = false;
  isProcessing = false;
  errors: any;
  id: any = 'new';
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private router: Router
  ) {
    this.lead_data = this.fb.group({
      id: ['new', Validators.required],
      company_name: ['', Validators.required],
      source: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      assigned_to: ['', Validators.required],
      lead_status: ['', Validators.required],
      product: ['', Validators.required],
      contact_persons: this.fb.array([this.createContactGroup()]),
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
    this.route.params.subscribe(params => {
      console.log(params['id']);
      if (params['id'] === 'new') {
        this.id = 'new';
        navigator.geolocation.getCurrentPosition(position => {
          console.log('Got position', position.coords);
          this.lead_data.value.latitude = position.coords.latitude;
          this.lead_data.value.longitude = position.coords.longitude;
        });
      } else {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.getData(this.id);
      }
    });
  }
  getData(id: any) {
    this.apiService.get('admin/crm/leads/' + id).then(data => {
      const l_data: any = data;
      this.lead_data.patchValue(l_data.data);
      console.log(this.lead_data.value);
    });
  }
  addOrUpdate(lead) {
    this.formTouched = true;
    this.isProcessing = true;
    console.log(lead);
    // post request
    this.apiService
      .post('admin/crm/leads', lead.value)
      .then(data => {
        const result: any = data;
        // success
        console.log(result);
        this.isProcessing = false;
        if (result.status) {
          this.notifyService.show(
            {
              title: 'Success',
              message: result.message
            },
            'success'
          );
        } else {
          this.notifyService.show(
            {
              title: 'Error',
              message: result.message
            },
            'error'
          );
          this.errors = result.error;
        }
      })
      .catch(error => {
        this.isProcessing = false;
        const errors: any = error;
        this.errors = errors;
      });
  }
  canDeactivate() {
    if (this.lead_data.dirty) {
      return confirm('Are You Sure you want to Discard the changes?');
    } else {
      return true;
    }
  }
}
