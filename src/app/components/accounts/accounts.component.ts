import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonRestService } from 'src/app/service/common-rest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
    accountForm:FormGroup;
    isUpdate:boolean;
    isView:boolean;
    accountId:number;
    genderList:any[]=[];
    educationList:any[]=[];
    accountTypeList:any[]=[];
    // gender:string;
    constructor(private commonRestService:CommonRestService,
                private activatedRoute:ActivatedRoute,
                private router:Router,
                private toastrService: ToastrService,
                private spinner: NgxSpinnerService
    ){
    }
    ngOnInit(): void {
      this.accountForm=new FormGroup({
        id:new FormControl(null,Validators.required),
        name:new FormControl(null,Validators.required),
        father_name:new FormControl(null,Validators.required),
        mother_name:new FormControl(null,Validators.required),
        phoneNo:new FormControl(null,Validators.required),
        email:new FormControl(null,[Validators.required,Validators.email]),
        dob:new FormControl(null,Validators.required),
        address:new FormControl(null,Validators.required),
        genderId:new FormControl(null,Validators.required),
        educationId:new FormControl(null,Validators.required),
        accountTypeId:new FormControl(null,Validators.required),
        intialAmount:new FormControl(null,Validators.required)
      });
      this.getGender();
      this.getEducation();
      this.getAccountType();
      
      this.activatedRoute.params.subscribe((params)=>{
        console.log(this.isUpdate);
        if(params['id']){
          this.accountId=params['id'];
          console.log(this.accountId);
          this.isUpdate=true;
          console.log(this.isUpdate);
          this.commonRestService.getById("account/v1/find/",this.accountId).subscribe(
            (accountResponse)=>{
              console.log(accountResponse);
              this.accountForm.patchValue({
                id:this.accountId,
                name:accountResponse.name,
                father_name:accountResponse.father_name,
                mother_name:accountResponse.mother_name,
                phoneNo:accountResponse.phoneNo,
                email:accountResponse.email,
                dob:accountResponse.dob,
                address:accountResponse.address,
                genderId:accountResponse.genderId,
                educationId:accountResponse.educationId,
                accountTypeId:accountResponse.accountTypeId
              });
            });
        }
        this.activatedRoute.queryParams.subscribe((queryParams)=>{
          console.log(queryParams);
          if(queryParams['isUpdate']){
              this.isUpdate=true;
          }
          if(queryParams['isView']){
            this.isView=true;
          }
        });
      });
    }

  getGender():void{
    this.commonRestService.get("gender/v1/list").subscribe(
      (response:any)=>{
        console.log(response);
        this.genderList=response;
      }
    );
  }
  getEducation():void{
    this.commonRestService.get("education/v1/list").subscribe(
      (response:any)=>{
        console.log(response);
        this.educationList=response;
      }
    );
  }
  getAccountType():void{
    this.commonRestService.get("accountType/v1/list").subscribe(
      (response:any)=>{
        console.log(response);
        this.accountTypeList=response;
      }
    );
  }
 
    getSubmitButtonText() {
      return this.isView ? 'View' : (this.isUpdate ? 'Update':'Add');
    }

    onSubmit() {
      console.log(this.accountForm.value);
      console.log(this.accountForm.value);
       this.commonRestService.addUpdateAccount(this.accountForm,this.isUpdate,this.accountId).subscribe(
        (response)=>{
           console.log(response);
           this.router.navigate(['/accountDetails']).then(()=>{
            this.accountForm.reset();
           });
       });
    }
}
