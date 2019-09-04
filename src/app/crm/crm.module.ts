import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { LeadCreateComponent } from './pages/lead/lead-create/lead-create.component';
import { LeadListComponent } from './pages/lead/lead-list/lead-list.component';
import { LeadDataRowComponent } from './pages/lead/lead-data-row/lead-data-row.component';
import { LeadDetailComponent } from './pages/lead/lead-detail/lead-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactSelectorComponent } from './selector-components/contact-selector/contact-selector.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeCreateComponent } from './pages/employee/employee-create/employee-create.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { AddressComponent } from './shared/address/address.component';
import { EmployeeSelectorComponent } from './selector-components/employee-selector/employee-selector.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    LeadCreateComponent,
    LeadListComponent,
    LeadDataRowComponent,
    LeadDetailComponent,
    ContactSelectorComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    AddressComponent,
    EmployeeSelectorComponent
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NgbModule.forRoot()
  ]
})
export class CrmModule {}
