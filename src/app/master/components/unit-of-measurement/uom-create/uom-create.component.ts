import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'app/shared/services/notify.service';

@Component({
  selector: 'app-uom-create',
  templateUrl: './uom-create.component.html',
  styleUrls: ['./uom-create.component.scss']
})
export class UomCreateComponent implements OnInit {
  isProcessing = false;
  errors: any;
  id: any = 'new';
  button_text = 'Add UOM';

  next = false;
  unit_data: FormGroup;
  uom: any;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private router: Router
  ) {
    this.unit_data = fb.group({
      unit_name: ['', Validators.required],
      id: ['new', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      if (params['id'] === 'new') {
        this.id = 'new';
      } else {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.getData(this.id);
        this.button_text = 'Edit UOM';
      }
    });
  }
  getData(id: any) {
    this.apiService.get('admin/uom/' + id).then(data => {
      const l_data: any = data;
      this.unit_data.patchValue(l_data.data);
    });
  }
  addOrUpdate(uom) {
    console.log(uom);
    // this.notifyService.show({
    //   title: 'Success',
    //   message: 'Done'
    // }, 'success');
    if (uom.invalid) {
      return false;
    }
    this.isProcessing = true;

    // post request
    this.apiService
      .post('admin/uom', uom.value)
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
          this.unit_data.reset();
          this.unit_data.patchValue({
            id: 'new'
          });
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

  cancel() {
    this.router.navigateByUrl('/master/unit-of-measurement');
  }
}
