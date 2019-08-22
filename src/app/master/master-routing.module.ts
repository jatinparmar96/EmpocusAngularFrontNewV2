import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { UomCreateComponent } from './components/unit-of-measurement/uom-create/uom-create.component';
import { UomListComponent } from './components/unit-of-measurement/uom-list/uom-list.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
