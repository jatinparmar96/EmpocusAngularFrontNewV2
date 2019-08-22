import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  product: FormGroup;
  raw_product: any;
  taxes: any;
  productCategories: any;
  errors: any;
  data: any[] = []
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.product = this.fb.group({
      "id": ['new', Validators.required],
      "product_name": ['', Validators.required],
      "product_display_name": [''],
      "product_code": ['', Validators.required],
      "product_uom": ['', Validators.required],
      "product_conv_uom": ['', Validators.required],
      "product_conv_factor": ['', Validators.required],
      "product_batch_type": ['1', Validators.required],
      "product_stock_ledger": ['0', Validators.required],
      "product_mrp_rate": ['', Validators.required],
      "product_rate_pick": ['', Validators.required],
      "product_purchase_rate": ['', Validators.required],
      "product_sales_rate": ['', Validators.required],
      "product_gst_rate": ['', Validators.required],
      "product_max_level": ['', Validators.required],
      "product_min_level": ['', Validators.required],
      "product_description": ['', Validators.required],
      "product_category": ['', Validators.required],
      "product_trade_name": ['', Validators.required],
      "product_hsn": ['', Validators.required],
      "product_type": ['', Validators.required],
      "product_store_location": ['', Validators.required],
    });
  }
  addOrUpdate() {

  }
  toBack() {

  }
}
