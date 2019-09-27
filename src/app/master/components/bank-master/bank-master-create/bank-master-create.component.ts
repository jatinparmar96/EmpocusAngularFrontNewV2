import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { NotifyService } from 'app/shared/services/notify.service';

@Component({
  selector: 'app-bank-master-create',
  templateUrl: './bank-master-create.component.html',
  styleUrls: ['./bank-master-create.component.scss']
})
export class BankMasterCreateComponent implements OnInit {
  active = 'today';
  debug = true;
  formTouched = false;
  isProcessing = false;
  errors: any;
  id: any = 'new';
  next = false;
  bank_data: FormGroup;
  bank: any;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private router: Router
  ) {
    this.bank_data = fb.group({
      id: ['new', Validators.required],
      account_no: ['BOI20199380190', Validators.required],
      bank_name: ['ICICI', Validators.required],
      account_name: ['Mohit', Validators.required],
      ifsc_code: ['ICIC007K', Validators.required],
      branch: ['Mumbai', Validators.required]
    });
    this.resetErrorMessages();
  }

  ngOnInit() {
    // 2 Starts
    this.route.params.subscribe(params => {
      console.log(params['id']);
      if (params['id'] === 'new') {
        this.id = 'new';
      } else {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.getData(this.id);
      }
    });
  }

  getData(id: any) {
    this.apiService.get('admin/bank/' + id).then(data => {
      const l_data: any = data;
      this.bank_data.patchValue(l_data.data);
    });
  }
  addOrUpdate(bank) {
    this.formTouched = true;
    if (bank.invalid) {
      return false;
    }
    this.resetErrorMessages();
    this.isProcessing = true;

    // post request
    this.apiService
      .post('admin/bank', bank.value)
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
          if (this.next) {
            this.router.navigateByUrl('/dashboard/bank-master/new');
          } else {
            this.router.navigateByUrl('/dashboard/bank-master');
          }
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
      bank_account_number: [''],
      bank: [''],
      bank_account_name: [''],
      bank_ifsc_code: [''],
      bank_branch: ['']
    };
  }

  advanceNext() {
    this.next = true;
  }
  cancel() {
    this.router.navigateByUrl('/dashboard/bank-master');
  }
}
