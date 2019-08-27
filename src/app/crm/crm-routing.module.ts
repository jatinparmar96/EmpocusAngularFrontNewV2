import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadCreateComponent } from './pages/lead/lead-create/lead-create.component';
import { LeadListComponent } from './pages/lead/lead-list/lead-list.component';
import { LeadDetailComponent } from './pages/lead/lead-detail/lead-detail.component';
import { FormAbandonGuard } from './guards/form-abandon.guard';
import { EmployeeCreateComponent } from './pages/employee/employee-create/employee-create.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeListResolverService } from './resolvers/employee-list-resolver.service';
import { EmployeeEditResolveService } from './resolvers/employee-edit-resolve.service';

const routes: Routes = [
  {
    path: 'lead',
    children: [
      {
        path: '',
        component: LeadListComponent
      },
      {
        path: ':id',
        component: LeadCreateComponent,
        canDeactivate: [FormAbandonGuard]
      },
      {
        path: 'show/:id',
        component: LeadDetailComponent
      }
    ]
  },
  {
    path: 'employee',
    children: [
      {
        path: ':id',
        component: EmployeeCreateComponent,
        resolve: {
          employee: EmployeeEditResolveService
        },
        canDeactivate: [FormAbandonGuard]
      },
      {
        path: '',
        component: EmployeeListComponent,
        resolve: {
          employeeList: EmployeeListResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EmployeeListResolverService]
})
export class CrmRoutingModule {}
