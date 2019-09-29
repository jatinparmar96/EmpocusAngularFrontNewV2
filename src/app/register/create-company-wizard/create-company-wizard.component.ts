import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-create-company-wizard',
  templateUrl: './create-company-wizard.component.html',
  styleUrls: ['./create-company-wizard.component.scss']
})
export class CreateCompanyWizardComponent implements OnInit {
  company_data: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.company_data = fb.group({
      name: ['Bitmanity', Validators.required],
      display_name: ['Bitmanity', Validators.required],
      email: ['bitmanity@gmail.com'],
      website: [],
      pan_number: [],
      tan_number: [],
      gst_number: [],
      iec_number: [],
      epc_number: [],
      ssi_number: [],
      nsic_number: [],
      udyog_aadhaar: [],
      tds_number: [],
      cin_number: []
    });
  }
  ngOnInit() {}
  finishFunction() {
    console.log(this.company_data.controls);
    if (this.company_data.valid) {
      this.apiService
        .post('admin/company_wizard', this.company_data.value)
        .then((data: any) => {
          if (data.status) {
            this.router.navigate(['/master']);
          }
        });
    }
  }

  get f() {
    return this.company_data.controls;
  }

  get company_name() {
    return this.company_data.get('company_name');
  }
}
