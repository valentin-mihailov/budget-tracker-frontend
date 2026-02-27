import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AccountComponent } from './Components/account/account.component';
import { BudgetComponent } from './Components/budget/budget.component';
import { authGuard } from './app.guard';

const routes: Routes = [
  { path: ``, redirectTo: `/login`, pathMatch: `full` },
  { path: `login`, component: LoginComponent },
  { path: `register`, component: RegisterComponent },
  {
    path: `dashboard`,
    canActivate: [authGuard],
    component: DashboardComponent,
    children: [
      { path: `account`, component: AccountComponent },
      { path: `budget`, component: BudgetComponent },
      { path: ``, redirectTo: `account`, pathMatch: `full` },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
