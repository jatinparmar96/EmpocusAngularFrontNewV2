import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'app/master/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  product: FormGroup;
  raw_product: any;
  taxes: any;
  uoms: any;
  productCategories: any;
  errors: any;
  data: any[] = [];
  constructor(
    private apiService: ApiService,
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.apiService
      .get('admin/product_category_full_list')
      .then((data: any) => {
        this.productCategories = data.data;
      });
    this.apiService.get('admin/uom_full_list').then((data: any) => {
      this.uoms = data.data;
    });
    this.apiService.get('admin/tax_full_list').then((data: any) => {
      this.taxes = data.data;
    });
  }

  ngOnInit() {
    this.product = this.fb.group({
      id: ['new', Validators.required],
      product_name: ['', Validators.required],
      product_display_name: [''],
      product_code: [''],
      product_hsn: [''],
      product_category: [''],
      product_uom: ['', Validators.required],
      product_conv_uom: ['', Validators.required],
      product_conv_factor: [0],
      product_trade_name: [''],
      product_type: [],
      product_store_location: [''],
      product_batch_type: [1, Validators.required],
      product_stock_ledger: [1, Validators.required],
      product_rate_pick: [],
      product_purchase_rate: [],
      product_sales_rate: [],
      product_mrp_rate: [],
      product_gst_rate: [],
      product_max_level: [],
      product_min_level: [],
      product_description: []
    });
    const id = +this.route.snapshot.params.id;
    if (id) {
      this.productService.get(id).subscribe((data: any) => {
        if (data) {
          this.product.patchValue(data);
        }
      });
    }
  }
  addOrUpdate(product: FormGroup) {
    if (product.valid) {
      this.productService.store(product.value).then((data: any) => {
        if (data.status) {
          this.router.navigate(['/master/product']);
        }
      });
    }
  }
  toBack() {}
}
