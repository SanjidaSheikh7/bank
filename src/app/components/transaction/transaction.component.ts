import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchResult } from 'src/app/model/search-result';
import { SearchTransactionResult } from 'src/app/model/search-transaction-result';
import { CommonRestService } from 'src/app/service/common-rest.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionList:any[]=[];
  searchTransactionResult:SearchTransactionResult={
  success:false,
  totalElements:0,
  totalPages:0,
  pages:[],
  currentPage:1,
  isFirst:false,
  isLast:false
 };

 search:any={
  accountNo:"",
  page:1,
  size:2,
  sortCol:"id",
  sortType:"ASC"
};
constructor(private commonRestService:CommonRestService,
  private toastrService: ToastrService,
  private spinner: NgxSpinnerService,
){}
ngOnInit(): void {
this.toastrService.toastrConfig.positionClass = 'toast-top-right';
this.toastrService.toastrConfig.timeOut = 1500;
this.getAllTransactionList();
}
getAllTransactionList():void{
  this.spinner.show();
  let params=new HttpParams().set("accountNo",this.search.accountNo);
  params=params.append("page",this.search.page);
  params=params.append("size",this.search.size);
  params=params.append("sortCol",this.search.sortCol);
  params=params.append("sortType",this.search.sortType);
  console.log(params);
   this.commonRestService.getAllwithParams('transaction/v1/list',params).subscribe(
    (response)=>{
      if(response.success){
        this.spinner.hide();
        this.transactionList=response.data;
        this.searchTransactionResult.currentPage=response.currentPage;
        this.searchTransactionResult.totalElements=response.totalElements;
        this.searchTransactionResult.totalPages=response.totalPages;
        this.searchTransactionResult.pages=response.pages;
        this.searchTransactionResult.isFirst=response.isFirst;
        this.searchTransactionResult.isLast=response.isLast;
      } else {
          this.spinner.hide();
          this.toastrService.error(response.message, "ERROR");
          // alert(response.message);
      }
    });
};
refreshPage():void{
  this.search.accountName=" ",
  this.search.page=1,
  this.search.size=2,
  this.search.sortCol="id",
  this.search.sortType="ASC"
  this.getAllTransactionList();
}
goPage(page:any):void{
  if(typeof(page)==="string"){
    page=Number(page);
  }
  this.search.page=page;
  this.getAllTransactionList();
}

prevPage():void{
  this.goPage(this.search.page-1);
}

nextPage():void{
  this.goPage(this.search.page+1);
}

sortByColName(colName: any): void {
  if(this.search.sortCol === colName){
    this.search.sortType = this.search.sortType === "ASC" ? "DESC" : "ASC";
  } else {
    this.search.sortCol = colName;
    this.search.sortType = "ASC";
  }

  this.getAllTransactionList();
}
}
