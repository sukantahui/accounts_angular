import { Component, OnInit } from '@angular/core';
import {ReceiveService} from '../../services/receive.service';
import {Ledger} from '../../models/ledger.model';
import {AssetService} from "../../services/asset.service";
import {Asset} from "../../models/asset.model";

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})
export class ReceiveComponent implements OnInit {
incomeLedgers: Ledger[] = [];
assets: Asset[] = [];

  constructor(private receiveService: ReceiveService, private asstService: AssetService) { }

  ngOnInit(): void {
    this.incomeLedgers = this.receiveService.getIncomeLedgers();
    this.receiveService.getIncomeLedgersUpdateListener().subscribe((data: Ledger[]) => {
      this.incomeLedgers = data;
    } );

    // assets
    this.assets = this.asstService.getAssets();
    this.asstService.getAssetsUpdateListener().subscribe((data: Asset[]) => {
      this.assets = data;
    });
  }

}
