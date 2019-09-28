import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any;
  link: any = '/dashboard/raw-product/new';
  page_controls: any;

  constructor(private router: Router, private apiService: ApiService) {
    apiService
      .get('admin/raw_product')
      .then(data => {
        const result: any = data;
        if (result.status) {
          this.page_controls = result.data;
          this.products = result.data.data;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  ngOnInit() {}
  edit(product_id) {
    this.router.navigateByUrl('/dashboard/raw-product/' + product_id);
  }
  toCreate() {
    this.router.navigate(['new']);
  }
  show(product_id) {
    this.router.navigateByUrl('/dashboard/raw-product/detail/' + product_id);
  }
}
