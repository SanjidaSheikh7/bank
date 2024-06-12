import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { DepositDetailComponent } from './components/deposit-detail/deposit-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { WithdrawDetailsComponent } from './components/withdraw-details/withdraw-details.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ChartComponent } from './components/chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    AccountDetailComponent,
    DepositComponent,
    DepositDetailComponent,
    HeaderComponent,
    WithdrawComponent,
    WithdrawDetailsComponent,
    TransactionComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({  // ToastrModule added
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
