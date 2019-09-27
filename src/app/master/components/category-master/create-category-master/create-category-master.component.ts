import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { NotifyService } from 'app/shared/services/notify.service';

@Component({
  selector: 'app-create-category-master',
  templateUrl: './create-category-master.component.html',
  styleUrls: ['./create-category-master.component.scss']
})
export class CreateCategoryMasterComponent implements OnInit {
  active = 'today';
  debug = true;
  formTouched = false;
  isProcessing = false;
  errors: any;
  id: any = 'new';
  data: any;
  taxData: any;

  category_data: FormGroup;
  category: any;
  taxes: any;
  productCategories: any;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private router: Router
  ) {
    this.resetErrorMessages();
    this.category_data = this.fb.group({
      id: ['new', Validators.required],
      product_category_name: ['abc', Validators.required]
    });
  }

  ngOnInit() {
    // 2 Starts
    // alternate method for getting parameter
    const a = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe(params => {
      console.log(params['id']);
      if (params['id'] === 'new') {
        this.id = 'new';
      } else {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.getData(this.id);
      }
    });
    // 2 Ends
  }
  // 3 Starts
  getData(id: any) {
    this.apiService.get('admin/product_category/' + id).then(data => {
      const l_data: any = data;
      this.category_data.patchValue(l_data.data);
    });
  }
  addOrUpdate(category) {
    this.formTouched = true;
    if (category.invalid) {
      return false;
    }
    this.resetErrorMessages();
    this.isProcessing = true;

    // post request
    this.apiService
      .post('admin/product_category', category.value)
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
      product_category_name: ['']
    };
  }

  cancel() {
    this.router.navigateByUrl('/dashboard/category');
  }
  // 3 Ends
}
