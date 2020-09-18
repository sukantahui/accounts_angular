import { Component, OnInit } from '@angular/core';
import {Ledger} from '../../models/ledger.model';
import {PaymentService} from '../../services/payment.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  expenditureLedgers: Ledger[] = [];
  transactionForm: FormGroup;
  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.expenditureLedgers = this.paymentService.getExpenditureLedgers();
    this.paymentService.getExpenditureLedgersUpdateListener().subscribe(data => {
      this.expenditureLedgers = data;
    });
    this.transactionForm = this.paymentService.transactionForm;
  }

}
