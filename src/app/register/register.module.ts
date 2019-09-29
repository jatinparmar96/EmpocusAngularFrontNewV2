import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateCompanyWizardComponent } from './create-company-wizard/create-company-wizard.component';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  declarations: [RegisterFormComponent, CreateCompanyWizardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    RouterModule,
    ArchwizardModule
  ]
})
export class RegisterModule {}
