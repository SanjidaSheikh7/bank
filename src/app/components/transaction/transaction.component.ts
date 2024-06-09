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
  transactionType: any[] = ['deposit', 'withdraw'];
  selectedTransactionType: string=null;
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
  transactionType:null,
  accountNo:"",
  page:1,
  size:10,
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
  let params=new HttpParams().set("transactionType",this.search.transactionType);
  params=params.append("accountNo",this.search.accountNo);
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
        this.searchResult.currentPage=response.currentPage;
        this.searchResult.totalElements=response.totalElements;
        this.searchResult.totalPages=response.totalPages;
        this.searchResult.pages=response.pages;
        this.searchResult.hasNext=response.hasNext;
        this.searchResult.hasPrevious=response.hasPrevious;
      } else {
          this.spinner.hide();
          this.toastrService.error(response.message, "ERROR");
          // alert(response.message);
      }
    });
};
refreshPage():void{
  this.search.transactionType=null,
  this.search.accountNo=" ",
  this.search.page=1,
  this.search.size=10,
  this.search.sortCol="id",
  this.search.sortType="ASC"
  this.selectedTransactionType=null;
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

onTransactionTypeChange() {
  // const selectedValue = this.selectedTransactionType;
  // console.log('Selected Transaction Type:', selectedValue);

  this.search.transactionType = this.selectedTransactionType;
  this.search.accountNo=" ",
  this.search.page = 1;
  this.search.size = 10;
  this.search.sortCol = 'id';
  this.search.sortType = 'ASC';

  this.getAllTransactionList();
}

}
