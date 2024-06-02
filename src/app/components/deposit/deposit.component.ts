import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRestService } from 'src/app/service/common-rest.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit{
  depositForm:FormGroup;
  depositId:number;

  constructor(private commonRestService:CommonRestService,
              private router:Router
  ){}
  ngOnInit(): void {
  this.depositForm=new FormGroup({
    id:new FormControl(null,Validators.required),
    amount:new FormControl(null,Validators.required),
    accountNo:new FormControl(null,Validators.required)
  });
 }
 onSubmit() {
   this.commonRestService.post('deposit/v1/create',this.depositForm.value).subscribe(
    (response)=>{
       console.log(response);
       this.router.navigate(['/depositDetails']).then(()=>{
        this.depositForm.reset();
       });
   });
}
}
