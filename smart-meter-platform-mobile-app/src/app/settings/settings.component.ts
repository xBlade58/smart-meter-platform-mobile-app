import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart/chart.service';
import { BroadcasterService } from '../broadcaster.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private chartService: ChartService,
    private broadcaster: BroadcasterService
  ) {}
  public userId: string = ChartService.userId;
  public energyPrice: number = ChartService.energyPrice;

  ngOnInit() {}

  public handleUserIdChange(event: any): void {
    this.userId = event.target.value;
    this.chartService.setUserId(this.userId);
    this.broadcaster.userIDChanged(true);
  }

  public handleEnergyPriceChange(event: any): void {
    this.energyPrice = event.target.value;
    this.chartService.setEnergyPrice(this.energyPrice);
  }
}
