import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupCompanyRoutingModule } from './setup-company-routing.module';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { BankInfoComponent } from './bank-info/bank-info.component';
import { CompanyOtherDetailsComponent } from './company-other-details/company-other-details.component';
import { HeadOfficeInfoComponent } from './head-office-info/head-office-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CompanyInfoComponent, BankInfoComponent, CompanyOtherDetailsComponent, HeadOfficeInfoComponent],
  imports: [
    CommonModule,
    SetupCompanyRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SetupCompanyModule { }
