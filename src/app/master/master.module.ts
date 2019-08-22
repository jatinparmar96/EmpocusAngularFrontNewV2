import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UomCreateComponent } from './components/unit-of-measurement/uom-create/uom-create.component';
import { UomListComponent } from './components/unit-of-measurement/uom-list/uom-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotifyService } from 'app/shared/services/notify.service';

@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductListComponent,
    ProductViewComponent,
    UomCreateComponent,
    UomListComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule
  ],
})
export class MasterModule { }
