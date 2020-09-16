import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


import {Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {catchError, tap} from 'rxjs/operators';
// this global.ts file is created to store all global variables
import {GlobalVariable} from '../shared/global';
import {formatDate} from '@angular/common';


export interface OrderResponseData {
  success: number;
  data: object;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderMasterForm: FormGroup;
  orderDetailsForm: FormGroup;

  constructor(private http: HttpClient) {
    const order_date = new Date();
    const delivery_date = new Date();
    delivery_date.setDate(order_date.getDate() + 3);
    const order_date_format = formatDate(order_date, 'yyyy-MM-dd', 'en');
    const delivery_date_format = formatDate(delivery_date, 'yyyy-MM-dd', 'en');


    this.orderMasterForm = new FormGroup({
      id : new FormControl(null),
      customer_id : new FormControl(null, [Validators.required]),
      agent_id : new FormControl(null, [Validators.required]),
      order_date : new FormControl(order_date_format, [Validators.required]),
      delivery_date : new FormControl(delivery_date_format, [Validators.required])
    });

    this.orderDetailsForm = new FormGroup({
      id : new FormControl(null),
      material_id : new FormControl(3, [Validators.required]),
      product_id : new FormControl(null, [Validators.required]),
      model_number : new FormControl(null, [Validators.required]),
      p_loss : new FormControl(null, [Validators.required]),
      price : new FormControl(null, [Validators.required]),
      price_code : new FormControl(null, [Validators.required]),
      approx_gold : new FormControl(null, [Validators.required]),
      size : new FormControl(null, [Validators.required]),
      quantity : new FormControl(null, [Validators.required]),
      amount : new FormControl({value: 0, disabled: true} , [Validators.required])
    });
  }


  private _serverError(err: any) {
    // console.log('sever error:', err);  // debug
    if (err instanceof Response) {
      return throwError('backend server error');
      // if you're using lite-server, use the following line
      // instead of the line above:
      // return Observable.throw(err.text() || 'backend server error');
    }
    if (err.status === 0){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: 'Backend Server is not Working', statusText: err.statusText});
    }
    if (err.status === 401){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: 'You are not authorised', statusText: err.statusText});
    }
    return throwError(err);
  }

  getProductData(model_number, customer_category_id){

    // tslint:disable-next-line:max-line-length
    return this.http.post(GlobalVariable.BASE_API_URL + '/getProductData', {model_number, customer_category_id});
      // .subscribe((response: {success: number, data: Product[]}) => {
      //   const {data} = response;
      //   this.productData = data;
      //   this.productDataSub.next([...this.productData]);
      // });
  }
}
