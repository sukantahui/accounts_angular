import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject, throwError} from "rxjs";
import {CashBookComponent} from "../pages/cash-book/cash-book.component";
import {CashBook} from "../models/cash-book.model";
import {GlobalVariable} from "../shared/global";
import {catchError, tap} from "rxjs/operators";
import {Ledger} from "../models/ledger.model";


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class CashBookService {
  cashBookList: CashBook[] = [];
  cashBookSubject = new Subject<CashBook[]>();
  constructor(private http: HttpClient) {
    this.http.get(GlobalVariable.BASE_API_URL + '/cashBook')
      .pipe(catchError(this.handleError), tap((response: {success: number, data: CashBook[]}) => {
        const {data} = response;
        this.cashBookList = data;
        this.cashBookSubject.next([...this.cashBookList]);
      })).subscribe();
  } // end of constructor

  getCashBookList(){
    return [...this.cashBookList];
  }
  getCashBookListListener(){
    return this.cashBookSubject.asObservable();
  }

  private handleError(errorResponse: HttpErrorResponse){
    // when your api server is not working
    if (errorResponse.status === 0){
      alert('your API is not working');
    }
    if (errorResponse.status === 401){
      alert(errorResponse.error.message);
    }

    if (errorResponse.error.message.includes('1062')){
      return throwError({success: 0, status: 'failed', message: 'Record already exists', statusText: ''});
    }else if (errorResponse.error.message.includes('1451')){
      return throwError({success: 0, status: 'failed', message: 'This record can not be deleted', statusText: ''});
    }else {
      return throwError(errorResponse.error.message);
    }
  }

  private serverError(err: any) {
    console.log('sever error:', err);  // debug
    if (err instanceof Response) {
      return throwError({success: 0, status: err.status, message: 'Backend Server is not Working', statusText: err.statusText});
      // if you're using lite-server, use the following line
      // instead of the line above:
      // return Observable.throw(err.text() || 'backend server error');
    }
    if (err.status === 0){
      // tslint:disable-next-line:label-position
      return throwError ({success: 0, status: err.status, message: 'Backend Server is not Working', statusText: err.statusText});
    }
    if (err.status === 401){
      // tslint:disable-next-line:label-position
      return throwError ({success: 0, status: err.status, message: 'Your are not authorised', statusText: err.statusText});
    }
    if (err.status === 500){
      // tslint:disable-next-line:label-position
      return throwError ({success: 0, status: err.status, message: 'Server error', statusText: err.statusText});
    }
    return throwError(err);
  }
}
