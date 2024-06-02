import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonRestService {
  domain:string;
  constructor(private http:HttpClient) {
    this.domain=this.domain='http://localhost:8080/';
   }
   
   
   public get(endPoint:string):Observable<any>{
    return this.http.get(this.domain+endPoint);
   }

   public getAllwithParams(endPoint:string,params:HttpParams):Observable<any>{
    return this.http.get(this.domain+endPoint,{params:params});
   }
   
   public getById(endPoint:string,id:number):Observable<any>{
    return this.http.get(this.domain+endPoint+id);
   }

   public post(endPoint:string,body:any):Observable<any>{
      return this.http.post(this.domain+endPoint,body);
   }

   public update(endPoint:string,id:number,body:object):Observable<any>{
      return this.http.put(this.domain+endPoint+id,body);
   }

   public delete(endPoint:string,id:number):Observable<any>{
    return this.http.delete(this.domain+endPoint+id);
   }

   addUpdateAccount(form:FormGroup,isUpdate:boolean,accountId:number):Observable<any>{
      if(isUpdate){
        return this.update('account/v1/update/',accountId,form.value);
      }else{
        return this.post('account/v1/create',form.value);
      }
   }
}
