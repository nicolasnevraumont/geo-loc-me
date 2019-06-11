import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogsListViewComponent } from './components/logs-list-view/logs-list-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogAddFormComponent } from './components/log-add-form/log-add-form.component';
import { LoginComponent } from "./components/login/login.component";

import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: 'logs', component: LogsListViewComponent, canActivate: [AuthGuard] },
  { path: 'logs/add', component: LogAddFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/logs/add', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- to true for debugging routes (console log)
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
