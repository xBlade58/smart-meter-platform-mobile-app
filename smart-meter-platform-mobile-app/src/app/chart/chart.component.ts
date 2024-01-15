import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

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

  constructor() {}

  ngOnInit() {
    this.getHouseholds();
  }

  public handleChange(event: any): void {
    console.log(event.target.value); // Use for req
    this.initData();
  }

  private getHouseholds(): void {
    this.households = [
      { street: 'Marktstraße 14', id: '1' },
      { street: 'Hegergasse 1', id: '2' },
      { street: 'Radetzkystraße 92a', id: '3' },
    ];
  }

  private initData(): void {
    this.lineChartData = {
      labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          label: 'Power Consumption',
          fill: true,
          tension: 0.5,
          borderColor: 'rgba(255,0,0,1)',
          backgroundColor: 'rgba(255,0,0,0.3)',
          stepped: true,
        },
        {
          data: [65, 59, 80, 81, 56, 55, 40].map((x) => x * 0.2),
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
