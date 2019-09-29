import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { CreateCompanyWizardComponent } from './create-company-wizard/create-company-wizard.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterFormComponent
  },
  {
    path: 'create',
    component: CreateCompanyWizardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
