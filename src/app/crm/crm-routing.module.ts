import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadCreateComponent } from './pages/lead/lead-create/lead-create.component';
import { LeadListComponent } from './pages/lead/lead-list/lead-list.component';
import { LeadDetailComponent } from './pages/lead/lead-detail/lead-detail.component';
import { FormAbandonGuard } from './guards/form-abandon.guard';

const routes: Routes = [
  {
    path: 'lead/:id',
    component: LeadCreateComponent,
    canDeactivate: [FormAbandonGuard]
  },
  {
    path: 'lead',
    component: LeadListComponent
  },
  {
    path: 'lead/show/:id',
    component: LeadDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
