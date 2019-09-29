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
import { BankMasterCreateComponent } from './components/bank-master/bank-master-create/bank-master-create.component';
import { BankMasterViewComponent } from './components/bank-master/bank-master-view/bank-master-view.component';
import { CreateCategoryMasterComponent } from './components/category-master/create-category-master/create-category-master.component';
import { ViewCategoryMasterComponent } from './components/category-master/view-category-master/view-category-master.component';
import { CreateBranchMasterComponent } from './components/branch-master/create-branch-master/create-branch-master.component';
import { ShowBranchMasterComponent } from './components/branch-master/show-branch-master/show-branch-master.component';
import { ViewBranchMasterComponent } from './components/branch-master/view-branch-master/view-branch-master.component';
import { CreateChartsOfAccountComponent } from './components/charts-of-account/create-charts-of-account/create-charts-of-account.component';
import { ShowChartsOfAccountComponent } from './components/charts-of-account/show-charts-of-account/show-charts-of-account.component';
import { ViewChartsOfAccountComponent } from './components/charts-of-account/view-charts-of-account/view-charts-of-account.component';
import { CreateChargesMasterComponent } from './components/charges-master/create-charges-master/create-charges-master.component';
import { ViewChargesMasterComponent } from './components/charges-master/view-charges-master/view-charges-master.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductListComponent,
    ProductViewComponent,
    UomCreateComponent,
    UomListComponent,
    BankMasterCreateComponent,
    BankMasterViewComponent,
    CreateCategoryMasterComponent,
    ViewCategoryMasterComponent,
    CreateBranchMasterComponent,
    ShowBranchMasterComponent,
    ViewBranchMasterComponent,
    CreateChartsOfAccountComponent,
    ShowChartsOfAccountComponent,
    ViewChartsOfAccountComponent,
    CreateChargesMasterComponent,
    ViewChargesMasterComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class MasterModule {}
