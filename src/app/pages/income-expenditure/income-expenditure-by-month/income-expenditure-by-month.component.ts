import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../../../services/report.service';
export interface IncomeAndExpenditure {
  ledger_id: number;
  ledger_name: string;
  amount: number;
}
@Component({
  selector: 'app-income-expenditure-by-month',
  templateUrl: './income-expenditure-by-month.component.html',
  styleUrls: ['./income-expenditure-by-month.component.scss']
})
export class IncomeExpenditureByMonthComponent implements OnInit {
  searchMonth: number;
  private sub: any;
  searchYear: number;
  incomeList: IncomeAndExpenditure[];
  expenditureList: IncomeAndExpenditure[];
  incomeTotal = 0;
  expenditureTotal = 0;
  surplus = 0;
  constructor(private route: ActivatedRoute, private reportService: ReportService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.searchMonth = +params.month; // (+) converts string 'month' to a number
      this.searchYear = +params.year; // (+) converts string 'year' to a number
      // @ts-ignore
      this.reportService.getIncomeGroupTotalListByYearAndMonth(this.searchYear, this.searchMonth).subscribe(response => {
          this.incomeList = response.data;
          this.incomeTotal = this.incomeList.reduce( (total, record) => {
              // @ts-ignore
              return total +  record.amount;
          }, 0);
        this.surplus = this.incomeTotal - this.expenditureTotal;
      });
      this.reportService.getExpenditureGroupTotalListByYearAndMonth(this.searchYear, this.searchMonth).subscribe(response => {
        this.expenditureList = response.data;
        this.expenditureTotal = this.expenditureList.reduce( (total, record) => {
          // @ts-ignore
          return total +  record.amount;
        }, 0);
        this.surplus = this.incomeTotal - this.expenditureTotal;
      });
      // In a real app: dispatch action to load the details here.
    });
  }

}
