import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { DepositDetailComponent } from './components/deposit-detail/deposit-detail.component';

const routes: Routes = [
  { path: 'account', component: AccountsComponent,title:'Add_Account'},
  { path: 'accountDetails', component: AccountDetailComponent,title:'AccountDetails'},
  { path: 'account/:id', component:AccountsComponent ,title:'Update Account'},
  { path: 'deposit', component:DepositComponent ,title:'Deposit' },
  { path: 'depositDetails', component:DepositDetailComponent ,title:'depositDetails' },
  { path: '', redirectTo:'accountDetails',pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
