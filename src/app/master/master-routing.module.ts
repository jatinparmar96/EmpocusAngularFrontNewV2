import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { UomCreateComponent } from './components/unit-of-measurement/uom-create/uom-create.component';
import { UomListComponent } from './components/unit-of-measurement/uom-list/uom-list.component';
import { ViewChargesMasterComponent } from './components/charges-master/view-charges-master/view-charges-master.component';
import { CreateChargesMasterComponent } from './components/charges-master/create-charges-master/create-charges-master.component';
import { CreateBranchMasterComponent } from './components/branch-master/create-branch-master/create-branch-master.component';
import { ShowBranchMasterComponent } from './components/branch-master/show-branch-master/show-branch-master.component';
import { ViewBranchMasterComponent } from './components/branch-master/view-branch-master/view-branch-master.component';
import { BankMasterViewComponent } from './components/bank-master/bank-master-view/bank-master-view.component';
import { BankMasterCreateComponent } from './components/bank-master/bank-master-create/bank-master-create.component';
import { CreateChartsOfAccountComponent } from './components/charts-of-account/create-charts-of-account/create-charts-of-account.component';
import { ViewChartsOfAccountComponent } from './components/charts-of-account/view-charts-of-account/view-charts-of-account.component';
import { ShowChartsOfAccountComponent } from './components/charts-of-account/show-charts-of-account/show-charts-of-account.component';
import { CreateCategoryMasterComponent } from './components/category-master/create-category-master/create-category-master.component';
import { ViewCategoryMasterComponent } from './components/category-master/view-category-master/view-category-master.component';

const routes: Routes = [
  {
    path: 'product/:id',
    component: ProductCreateComponent
  },
  {
    path: 'product',
    component: ProductListComponent
  },
  {
    path: 'product/detail/:id',
    component: ProductViewComponent
  },
  {
    path: 'unit-of-measurement/:id',
    component: UomCreateComponent
  },
  {
    path: 'unit-of-measurement',
    component: UomListComponent
  },
  {
    path: 'charges-master',
    component: ViewChargesMasterComponent
  },
  {
    path: 'charges-master/:id',
    component: CreateChargesMasterComponent
  },
  {
    path: 'branch-master/:id',
    component: CreateBranchMasterComponent
  },
  {
    path: 'branch-master/detail/:id',
    component: ShowBranchMasterComponent
  },
  {
    path: 'branch-master',
    component: ViewBranchMasterComponent
  },

  {
    path: 'bank-master',
    component: BankMasterViewComponent
  },
  {
    path: 'bank-master/:id',
    component: BankMasterCreateComponent
  },

  {
    path: 'charts-of-accounts/:id',
    component: CreateChartsOfAccountComponent
  },
  {
    path: 'charts-of-accounts',
    component: ViewChartsOfAccountComponent
  },
  {
    path: 'charts-of-accounts/detail/:id',
    component: ShowChartsOfAccountComponent
  },
  {
    path: 'category/:id',
    component: CreateCategoryMasterComponent
  },
  {
    path: 'category',
    component: ViewCategoryMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
