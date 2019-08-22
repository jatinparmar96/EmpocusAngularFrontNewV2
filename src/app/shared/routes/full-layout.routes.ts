import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: 'changelog',
    loadChildren: () => import('../../changelog/changelog.module').then(m => m.ChangeLogModule)
  },
  {
    path: 'full-layout',
    loadChildren: () => import('app/pages/full-layout-page/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: 'master',
    loadChildren: () => import('app/master/master.module').then(m => m.MasterModule)
  },

];
