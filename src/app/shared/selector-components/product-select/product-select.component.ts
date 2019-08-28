import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, concat, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError,
  map
} from 'rxjs/operators';
import { ProductService } from 'app/shared/services/product.service';

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.scss']
})
export class ProductSelectComponent implements OnInit {
  @Input() parentForm: string;
  @Input() controlName: string;
  @Output() value = new EventEmitter();

  product: Observable<any>;
  product_loading = false;
  productInput = new Subject<string>();

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this.loadItems();
  }
  private loadItems() {
    this.product = concat(
      of([]), // default items
      this.productInput.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.product_loading = true)),
        switchMap(term =>
          this._productService.searchProductByName(term).pipe(
            catchError(() => of([])), // empty list on error
            map((data: any) => (data = data.data)),
            tap((val: any) => {
              this.product_loading = false;
              console.log(val);
            })
          )
        )
      )
    );
  }
}
