import { Component, OnInit } from '@angular/core';
import {CashBookService} from '../../../services/cash-book.service';
import {CashBook} from '../../../models/cash-book.model';

@Component({
  selector: 'app-cash-book-home',
  templateUrl: './cash-book-home.component.html',
  styleUrls: ['./cash-book-home.component.scss']
})
export class CashBookHomeComponent implements OnInit {
  cashBookList: CashBook[] = [];
  constructor(private cashBookService: CashBookService) { }

  ngOnInit(): void {
    this.cashBookList = this.cashBookService.getCashBookList();
    this.cashBookService.getCashBookListListener().subscribe(data => {
       this.cashBookList = data;
    });
  }

}
