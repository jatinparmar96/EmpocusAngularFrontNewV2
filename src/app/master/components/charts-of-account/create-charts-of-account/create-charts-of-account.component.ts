import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { NotifyService } from 'app/shared/services/notify.service';

@Component({
  selector: 'app-create-charts-of-account',
  templateUrl: './create-charts-of-account.component.html',
  styleUrls: ['./create-charts-of-account.component.scss']
})
export class CreateChartsOfAccountComponent implements OnInit {
  active = 'today';
  coa_data: FormGroup;
  chartOfAccounts: FormGroup;
  formTouched = false;
  isProcessing = false;
  errors: any;
  id: any = 'new';
  address: any;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private router: Router
  ) {
    this.coa_data = this.fb.group({
      id: ['new'],
      ca_company_name: [, Validators.required],
      ca_company_display_name: [],
      ca_category: ['Creditor'],
      ca_code: [],
      ca_opening_amount: [],
      ca_opening_type: ['Creditor'],
      contact: this.fb.group({
        ca_contact_first_name: [, Validators.required],
        ca_contact_last_name: [],
        ca_contact_mobile_number: [897814687948, Validators.required],
        ca_contact_email: [],
        ca_contact_designation: [],
        ca_contact_branch: []
      }),
      ca_website: [],
      ca_pan: [],
      ca_gstn: [],
      ca_tan: [],
      ca_date_opened: []
    });
    this.resetErrorMessages();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] === 'new') {
        this.id = 'new';
      } else {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.getData(this.id);
      }
    });
  }

  getData(id: any) {
    this.apiService.get('admin/coa/' + id).then(data => {
      const l_data: any = data;
      this.coa_data.patchValue(l_data.data);
    });
  }
  addOrUpdate(coa) {
    this.formTouched = true;
    if (coa.invalid) {
      return false;
    }
    this.resetErrorMessages();
    this.isProcessing = true;

    // post request
    this.apiService
      .post('admin/coa', coa.value)
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
          this.router.navigate(['/master', 'charts-of-accounts']);
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
  resetErrorMessages() {
    this.errors = {
      ca_company_name: [''],
      ca_company_display_name: [''],
      ca_category: [''],
      ca_code: [''],
      ca_opening_amount: [''],
      ca_opening_type: [''],
      ca_first_name: [''],
      ca_last_name: [''],
      ca_mobile_number: [''],
      ca_email: [''],
      ca_website: [''],
      ca_designation: [''],
      ca_branch: [''],
      ca_address_building: [''],
      ca_address_road_name: [''],
      ca_address_landmark: [''],
      ca_address_pincode: [''],
      ca_address_country: [''],
      ca_address_state: [''],
      ca_address_city: [''],
      ca_pan: [''],
      ca_gstn: [''],
      ca_tan: [''],
      ca_date_opened: ['']
    };
  }

  cancel() {
    this.router.navigateByUrl('/dashboard/charts-of-accounts');
  }
}
