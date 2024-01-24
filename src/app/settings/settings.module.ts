import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { SettingsComponent } from './settings.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    NgChartsModule,
    RouterModule.forChild([{ path: '', component: SettingsComponent }]),
    IonicModule,
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}
