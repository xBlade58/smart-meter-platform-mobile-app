import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    NgChartsModule,
    RouterModule.forChild([{ path: '', component: ChartComponent }]),
    IonicModule,
  ],
  exports: [ChartComponent],
})
export class ChartModule {}
