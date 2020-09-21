import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {AuthComponent} from './pages/auth/auth.component';
import {AuthGuardService} from './services/auth-guard.service';
import {OwnerComponent} from './pages/owner/owner.component';
import {ReceiveComponent} from './pages/receive/receive.component';
import {PaymentComponent} from './pages/payment/payment.component';
import {TransactionReportComponent} from './pages/transaction-report/transaction-report.component';
import {IncomeExpenditureComponent} from './pages/income-expenditure/income-expenditure.component';
import {IncomeExpenditureHomeComponent} from './pages/income-expenditure/income-expenditure-home/income-expenditure-home.component';
import {IncomeExpenditureByYearComponent} from './pages/income-expenditure/income-expenditure-by-year/income-expenditure-by-year.component';
import {IncomeExpenditureByMonthComponent} from './pages/income-expenditure/income-expenditure-by-month/income-expenditure-by-month.component';
import {LedgerComponent} from './pages/ledger/ledger.component';


// @ts-ignore
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'owner', canActivate:  [AuthGuardService], component: OwnerComponent},
  {path: 'receive', canActivate:  [AuthGuardService], component: ReceiveComponent},
  {path: 'payment', canActivate:  [AuthGuardService], component: PaymentComponent},
  {path: 'ledger', canActivate:  [AuthGuardService], component: LedgerComponent},
  {path: 'transactions', canActivate:  [AuthGuardService], component: TransactionReportComponent},
  {path: 'incomeAndExpenditure', canActivate:  [AuthGuardService], component: IncomeExpenditureComponent,
    children: [
      {path: '', component: IncomeExpenditureHomeComponent, pathMatch: 'full'},
      {path: 'incomeAndExpenditureByYear/:year', component: IncomeExpenditureByYearComponent},
      {path: 'incomeAndExpenditureByMonth/:year/:month', component: IncomeExpenditureByMonthComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
