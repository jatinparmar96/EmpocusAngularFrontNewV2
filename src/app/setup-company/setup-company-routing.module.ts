import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeadOfficeInfoComponent } from './head-office-info/head-office-info.component';
import { BankInfoComponent } from './bank-info/bank-info.component';
import { CompanyOtherDetailsComponent } from './company-other-details/company-other-details.component';
import { CompanyInfoComponent } from './company-info/company-info.component';

const routes: Routes = [
  {
    path: 'BranchDetails/',
    component: HeadOfficeInfoComponent
  },
  {
    path: 'BankDetails/',
    component: BankInfoComponent
  },
  {
    path: 'OtherDetails/',
    component: CompanyOtherDetailsComponent
  },
  {
    path: '',
    component: CompanyInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupCompanyRoutingModule {}
