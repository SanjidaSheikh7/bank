import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { DepositDetailComponent } from './components/deposit-detail/deposit-detail.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { WithdrawDetailsComponent } from './components/withdraw-details/withdraw-details.component';
import { TransactionComponent } from './components/transaction/transaction.component';

const routes: Routes = [
  { path: 'account', component: AccountsComponent,title:'Add_Account'},
  { path: 'accountDetails', component: AccountDetailComponent,title:'AccountDetails'},
  { path: 'account/:id', component:AccountsComponent ,title:'Update Account'},
  { path: 'deposit', component:DepositComponent ,title:'Deposit' },
  { path: 'depositDetails', component:DepositDetailComponent ,title:'depositDetails' },
  { path: 'withdraw', component:WithdrawComponent ,title:'withdraw' },
  { path: 'withdrawDetails', component:WithdrawDetailsComponent ,title:'withdrawDetails' },
  { path: 'transaction', component:TransactionComponent ,title:'transaction' },
  { path: '', redirectTo:'accountDetails',pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
