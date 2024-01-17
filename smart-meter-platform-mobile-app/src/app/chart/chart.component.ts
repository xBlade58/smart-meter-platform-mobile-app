import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartService } from './chart.service';
import { ChartType } from './types';

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
  public startDate: Date | any;
  public endDate: Date | any;
  public household: string | any;

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.getHouseholds();
  }

  public handleChange(event: any): void {
    this.household = event.target.value;
  }

  private getHouseholds(): void {
    this.households = [
      { street: 'Marktstraße 14', id: '1' },
      { street: 'Hegergasse 1', id: '2' },
      { street: 'Radetzkystraße 92a', id: '3' },
    ];
  }

  public displayChart(): void {
    if (this.household && this.startDate && this.endDate) {
      let data = this.chartService.getData(
        this.household,
        this.startDate,
        this.endDate
      );
      this.initData(data);
    } else {
      //TODO
      let data = this.chartService.getData(
        this.household,
        new Date(),
        new Date()
      );
      this.initData(data);
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
          data: data.powerConsumption.map((x) => x * 0.2),
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
}
