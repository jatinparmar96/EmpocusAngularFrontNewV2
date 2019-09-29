import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { NotifyService } from 'app/shared/services/notify.service';

@Component({
  selector: 'app-create-branch-master',
  templateUrl: './create-branch-master.component.html',
  styleUrls: ['./create-branch-master.component.scss']
})
export class CreateBranchMasterComponent implements OnInit {
  active = 'today';
  debug = true;
  formTouched = false;
  isProcessing = false;
  errors: any;
  id: any = 'new';
  data: any;
  branch_data: FormGroup;
  branch: any;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private router: Router
  ) {
    apiService.get('admin/bank_full_list').then((data: any) => {
      if (data.status) {
        this.data = data.data;
      }
    });
    this.resetErrorMessages();
    this.branch_data = fb.group({
      id: ['new', Validators.required],
      branch_name: ['', Validators.required],
      branch_code: ['', Validators.required],
      branch_gst_number: ['', Validators.required],
      branch_bank_id: ['', Validators.required],
      branch_godown: [0, Validators.required]
    });
  }

  ngOnInit() {
    // 2 Starts
    this.route.params.subscribe(params => {
      if (params['id'] === 'new') {
        this.id = 'new';
        console.log(this.branch_data.value);
      } else {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.getData(this.id);
      }
    });
    // 2 Ends
  }
  // 3 Starts

  getData(id: any) {
    this.apiService.get('admin/branch/' + id).then(data => {
      let l_data: any = data;
      l_data = l_data.data;
      console.log(l_data.address);
      this.branch_data.patchValue({
        id: l_data.id,
        branch_name: l_data.branch_name,
        branch_code: l_data.branch_code,
        branch_gst_number: l_data.branch_gst_number,
        branch_bank_id: l_data.branch_bank_id,
        branch_godown: l_data.branch_godown,
        address: l_data.address
      });
    });
  }
  addOrUpdate(branch) {
    this.formTouched = true;
    // if(branch.invalid){
    // 	return false;
    // }
    // console.log(branch.value)
    // return false;
    this.formTouched = true;
    if (branch.invalid) {
      return false;
    }
    this.resetErrorMessages();
    this.isProcessing = true;

    // post request
    this.apiService
      .post('admin/branch', branch.value)
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
          this.router.navigate(['/master', 'branch-master']);
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
      branch_name: [''],
      branch_code: [''],
      branch_gst_number: [''],
      branch_address_building_name: [''],
      branch_address_road_name: [''],
      branch_address_landmark: [''],
      branch_address_pincode: [''],
      branch_address_country: [''],
      branch_address_state: [''],
      branch_address_city: [''],
      branch_bank_id: ['']
    };
  }

  cancel() {
    this.router.navigateByUrl('/dashboard/branch-master');
  }
  // 3 Ends
}
