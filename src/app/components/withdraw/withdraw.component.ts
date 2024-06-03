import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { SearchResult } from 'src/app/model/search-result';
import { CommonRestService } from 'src/app/service/common-rest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdrawForm:FormGroup;
  withdrawId:number;
  accountList:Account[]=[];
  accountNoList:any[]=[];
  accountNoPresent:boolean=false;
  accountName: string = '';
  accountId:number;
  currentBalance:any;
  searchResult:SearchResult={
  success:false,
  totalElements:0,
  totalPages:0,
  hasNext:false,
  hasPrevious:false,
  pages:[],
  currentPage:1
 };

 search:any={
     accountName:"",
     page:1,
     size:2,
     sortCol:"id",
     sortType:"ASC"
 };
  constructor(private commonRestService:CommonRestService,
              private router:Router,
              private toastrService: ToastrService,
              private spinner: NgxSpinnerService,
  ){}
  ngOnInit(): void {
    this.toastrService.toastrConfig.positionClass = 'toast-top-left';
    this.toastrService.toastrConfig.timeOut = 1500;
  this.withdrawForm=new FormGroup({
    id:new FormControl(null,Validators.required),
    withdrawAmount:new FormControl(null,Validators.required),
    accountNo:new FormControl(null,Validators.required)
  });
  this.getAllAccountList();
 }

 getAllAccountList():void{
  let params=new HttpParams().set("accountName",this.search.accountName);
  params=params.append("page",this.search.page);
  params=params.append("size",this.search.size);
  params=params.append("sortCol",this.search.sortCol);
  params=params.append("sortType",this.search.sortType);
  this.commonRestService.getAllwithParams('account/v1/pagination',params).subscribe(
    (response)=>{
      if(response.success){
        this.accountList=response.data;
        this.searchResult.currentPage=response.currentPage;
        this.searchResult.totalElements=response.totalElements;
        this.searchResult.totalPages=response.totalPages;
        this.searchResult.pages=response.pages;
        this.searchResult.hasNext=response.hasNext;
        this.searchResult.hasPrevious=response.hasPrevious;
        if (this.accountList.length > 0) {
          this.accountNoList = this.accountList.map(account => account.accountNo.toString());
          console.log('Account Numbers:', this.accountNoList);
        }
      }
    },
    (error) => {
      console.error('No data in account table', error);
    }
  );
};

onBlurAccountNo(): void {
  const accountNoControl = this.withdrawForm.get('accountNo');
  if (accountNoControl) {
    const accountNumber = accountNoControl.value?.toString();
    this.accountNoPresent = this.accountNoList.includes(accountNumber);
    console.log(`Account number (${accountNumber}) is ${this.accountNoPresent ? 'valid' : 'invalid'}`);

    if (this.accountNoPresent) {
      const account = this.accountList.find(acc => acc.accountNo.toString() === accountNumber);
      if (account) {
        this.accountName = account.name;
        this.accountId = account.id;
        this.commonRestService.getById("balance/v1/find/", this.accountId).subscribe(
          (balanceResponse) => {
            this.currentBalance = balanceResponse.currentBalance;
            console.log(this.currentBalance);
          },
          (error) => {
            this.toastrService.error("Failed to fetch balance information", "ERROR");
          }
        );
      } else {
        this.toastrService.error("Account not found in the account list", "ERROR");
      }
    } else {
      this.accountName = '';
      this.toastrService.error("Invalid account number", "ERROR");
    }
  }
}


 onSubmit() {
  this.spinner.show();
   this.commonRestService.post('withdraw/v1/create',this.withdrawForm.value).subscribe(
    (response)=>{
      if(response.success){
        this.spinner.hide();
       console.log(response);
       this.router.navigate(['/withdrawDetails']).then(()=>{
        this.withdrawForm.reset();
       });
      } else {
        this.spinner.hide();
        this.toastrService.error(response.message, "ERROR");
    }
   });
  }
}
