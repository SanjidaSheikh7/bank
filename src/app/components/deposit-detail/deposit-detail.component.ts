import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchResult } from 'src/app/model/search-result';
import { CommonRestService } from 'src/app/service/common-rest.service';

@Component({
  selector: 'app-deposit-detail',
  templateUrl: './deposit-detail.component.html',
  styleUrls: ['./deposit-detail.component.css']
})
export class DepositDetailComponent implements OnInit{
    depositList:any[]=[];
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
    this.getAllDepositList();
  }
  getAllDepositList():void{
    this.spinner.show();
    let params=new HttpParams().set("accountNo",this.search.accountNo);
    params=params.append("page",this.search.page);
    params=params.append("size",this.search.size);
    params=params.append("sortCol",this.search.sortCol);
    params=params.append("sortType",this.search.sortType);
    console.log(params);
     this.commonRestService.getAllwithParams('deposit/v1/pagination',params).subscribe(
      (response)=>{
        if(response.success){
          this.spinner.hide();
          this.depositList=response.data;
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
  goPage(page:any):void{
    if(typeof(page)==="string"){
      page=Number(page);
    }
    this.search.page=page;
    this.getAllDepositList();
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

    this.getAllDepositList();
  }

  refreshPage():void{
       this.search.accountName=" ",
       this.search.page=1,
       this.search.size=2,
       this.search.sortCol="id",
       this.search.sortType="ASC"
       this.getAllDepositList();
  }
}
