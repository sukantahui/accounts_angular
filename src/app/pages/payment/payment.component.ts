import { Component, OnInit } from '@angular/core';
import {Ledger} from '../../models/ledger.model';
import {PaymentService} from '../../services/payment.service';
import {FormGroup} from '@angular/forms';
import {Asset} from '../../models/asset.model';
import {Transaction} from '../../models/transaction.model';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  expenditureLedgers: Ledger[] = [];
  assets: Asset[] = [];
  expenditureTransactions: Transaction[] = [];

  transactionForm: FormGroup;
  searchTerm: any;
  pageSize = 10;
  p = 1;
  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.expenditureLedgers = this.paymentService.getExpenditureLedgers();
    this.paymentService.getExpenditureLedgersUpdateListener().subscribe(data => {
      this.expenditureLedgers = data;
    });
    this.transactionForm = this.paymentService.transactionForm;
  } // end of ngonit

  handleTransactionDateChange($event: MatDatepickerInputEvent<unknown>) {
    let val = this.transactionForm.value.transaction_date;
    val = formatDate(val, 'yyyy-MM-dd', 'en');
    this.transactionForm.patchValue({transaction_date: val});
  }

  saveExpenditureTransaction() {

    Swal.fire({
      title: 'Confirmation',
      text: 'Do you sure to Save',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save It!'
    }).then((result) => {
      // if selected yes
      if (result.value) {
        // will be saved from here

        // tslint:disable-next-line:max-line-length
        this.paymentService.saveExpenditureTransaction(this.transactionForm.value).subscribe(response => {
          if (response.success === 1){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Sale saved',
              showConfirmButton: false,
              timer: 3000
            }).then(r => {
              this.transactionForm.patchValue({ledger_id: null, asset_id: 1, amount: 0, particulars: null});
            });
          }
        }, (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
            footer: '<a href>Why do I have this issue?</a>',
            timer: 0
          });
        });
      }else{
        // will not be saved
      }
    });
  }

  clearTransactionForm() {
    const now = new Date();
    const val = formatDate(now, 'yyyy-MM-dd', 'en');
    this.transactionForm.patchValue({transaction_date: val, ledger_id: null, asset_id: 1, amount: 0, particulars: null});
  }

}
