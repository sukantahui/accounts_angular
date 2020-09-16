import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OrderService} from '../../services/order.service';
import { DatePipe } from '@angular/common';
import {StorageMap} from '@ngx-pwa/local-storage';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SncakBarComponent} from '../../common/sncak-bar/sncak-bar.component';
import {Observable} from 'rxjs';
import {ConfirmationDialogService} from '../../common/confirmation-dialog/confirmation-dialog.service';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})

export class OrderComponent implements OnInit {
  minDate = new Date(2010, 11, 2);
  maxDate = new Date(2021, 3, 2);
  startDate = new Date(2020, 0, 2);

  public currentError: any;

  pipe = new DatePipe('en-US');

  now = Date.now();
  public editableItemIndex = -1;
  public orderContainer: any;



  // tslint:disable-next-line:max-line-length
  constructor(private confirmationDialogService: ConfirmationDialogService,  private orderService: OrderService, private storage: StorageMap, private _snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
  }

























}
