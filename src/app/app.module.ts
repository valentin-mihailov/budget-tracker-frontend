import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AccountComponent } from './Components/account/account.component';
import { BudgetComponent } from './Components/budget/budget.component';
import { TransactionModalComponent } from './Components/transaction-modal/transaction-modal.component';
import { TransactionListComponent } from './Components/transaction-list/transaction-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    BudgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AccountComponent,
    TransactionModalComponent,
    TransactionListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
