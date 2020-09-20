import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../../../services/report.service';

@Component({
  selector: 'app-income-expenditure-by-month',
  templateUrl: './income-expenditure-by-month.component.html',
  styleUrls: ['./income-expenditure-by-month.component.scss']
})
export class IncomeExpenditureByMonthComponent implements OnInit {
  searchMonth: number;
  private sub: any;
  searchYear: number;
  constructor(private route: ActivatedRoute, private reportService: ReportService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.searchMonth = +params.month; // (+) converts string 'month' to a number
      this.searchYear = +params.year; // (+) converts string 'year' to a number
      this.reportService.getIncomeGroupTotalListByYearAndMonth(this.searchYear, this.searchMonth).subscribe(response => {

      });
      // In a real app: dispatch action to load the details here.
    });
  }

}
