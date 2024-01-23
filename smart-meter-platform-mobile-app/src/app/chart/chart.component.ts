import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartService } from './chart.service';
import { ChartType } from './types';
import { ToastController } from '@ionic/angular';
import { BroadcasterService } from '../broadcaster.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public lineChartData: ChartConfiguration<'line'>['data'] | undefined;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;
  public households: { street: string; id: string }[] = [];
  public startDate: string | any = '05-06-2023';
  public endDate: string | any = '05-07-2023';
  public household: string | any;
  public showProgressBar: boolean = false;

  constructor(
    private chartService: ChartService,
    private toastController: ToastController,
    private broadcaster: BroadcasterService
  ) {}

  ngOnInit() {
    this.broadcaster.userIdChanged$.subscribe((data) => {
      if (data) this.getHouseholds();
    });
    this.getHouseholds();
  }

  public handleChange(event: any): void {
    this.household = event.target.value;
  }

  public handleStartDateChange(event: any): void {
    this.startDate = event.target.value;
  }

  public handleEndDateChange(event: any): void {
    this.endDate = event.target.value;
  }

  private async getHouseholds() {
    this.households = await this.chartService.getHouseholds();
  }

  public async displayChart(): Promise<void> {
    if (this.household && this.startDate && this.endDate) {
      this.showProgressBar = true;
      let data = await this.chartService.getData(
        this.household,
        new Date(this.startDate),
        new Date(this.endDate)
      );
      this.showProgressBar = false;
      this.initData(data);
    } else {
      this.presentToast('Inputs are not complete!');
    }
  }

  private initData(data: ChartType): void {
    this.lineChartData = {
      labels: data.labels,
      datasets: [
        {
          data: data.powerConsumption,
          label: 'Power Consumption',
          fill: true,
          tension: 0.5,
          borderColor: 'rgba(255,0,0,1)',
          backgroundColor: 'rgba(255,0,0,0.3)',
          stepped: true,
        },
        {
          data: data.powerConsumption.map(
            (x) => x * (ChartService.energyPrice / 100)
          ),
          label: 'Costs',
          fill: false,
          tension: 0.5,
          borderColor: 'rgba(0,255,0,1)',
          backgroundColor: 'rgba(0,255,0,0.3)',
          stepped: true,
        },
      ],
    };
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });

    await toast.present();
  }
}
// TODO broadcaster
