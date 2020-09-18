import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {AuthComponent} from './pages/auth/auth.component';
import {AuthGuardService} from './services/auth-guard.service';
import {OwnerComponent} from './pages/owner/owner.component';
import {ReceiveComponent} from './pages/receive/receive.component';
import {PaymentComponent} from './pages/payment/payment.component';
import {TransactionReportComponent} from './pages/transaction-report/transaction-report.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'owner', canActivate:  [AuthGuardService], component: OwnerComponent},
  {path: 'receive', canActivate:  [AuthGuardService], component: ReceiveComponent},
  {path: 'payment', canActivate:  [AuthGuardService], component: PaymentComponent},
  {path: 'transactions', canActivate:  [AuthGuardService], component: TransactionReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
