import { Injectable } from '@angular/core';
import {Ledger} from '../models/ledger.model';
import {Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {GlobalVariable} from '../shared/global';
import {catchError, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ReceiveService {
IncomeLedgers: Ledger[] = [];
IncomeLedgerSubject = new Subject<Ledger[]>();

  constructor(private http: HttpClient, private router: Router) {
    this.http.get(GlobalVariable.BASE_API_URL + '/incomeLedgers')
      .pipe(catchError(this.handleError), tap((response: {success: number, data: Ledger[]}) => {
        const {data} = response;
        this.IncomeLedgers = data;
        this.IncomeLedgerSubject.next([...this.IncomeLedgers]);
      })).subscribe();
  }// end of constructor

  getIncomeLedgersUpdateListener(){
    return this.IncomeLedgerSubject.asObservable();
  }

  getIncomeLedgers(){
    return [...this.IncomeLedgers];
  }


  private handleError(errorResponse: HttpErrorResponse){
    // when your api server is not working
    if (errorResponse.status === 0){
      alert('your API is not working');
    }
    if (errorResponse.status === 401){
      alert(errorResponse.error.message);
      // this.router.navigate(['/auth']).then();
      this.router.navigate(['/owner']).then(r => {console.log(r); });
      location.reload();
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
