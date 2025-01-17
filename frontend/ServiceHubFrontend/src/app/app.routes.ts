import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'services', loadChildren: () => import('./features/services/services.module').then(m => m.ServicesModule), canActivate: [AuthGuard], },
  { path: 'submissions', loadChildren: () => import('./features/submissions/submissions.module').then(m => m.SubmissionsModule), canActivate: [AuthGuard], },
  { path: 'reports', loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule), canActivate: [AuthGuard], },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
