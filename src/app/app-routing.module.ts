import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';

import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';

import { AuthGuard } from './shared/auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('app/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('app/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'setup-company',
    pathMatch: 'full',
    loadChildren: () =>
      import('app/setup-company/setup-company.module').then(
        m => m.SetupCompanyModule
      )
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'full-layout',
    canActivate: [AuthGuard]
  },

  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'full Views' },
    children: Full_ROUTES,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: CONTENT_ROUTES,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
