import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartType, TimeAndPowerType } from './types';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  getData(household: string, startDate: Date, endDate: Date): ChartType {
    let data = this.sendRequest(
      household,
      startDate.toISOString().split('.')[0],
      endDate.toISOString().split('.')[0]
    );
    let timeAndPowerList: TimeAndPowerType[] = [];
    data.forEach((entry) => {
      let powerConsumptionSum = entry.propertyValues
        .filter(
          (propertyValue) =>
            propertyValue.operationalPropertyDef === '2.7.0' ||
            propertyValue.operationalPropertyDef === '2.8.0'
        )
        .reduce((acc, currentValue) => acc + currentValue.value, 0);
      let timeAndPower: TimeAndPowerType = {
        time: new Date(entry.readingTime),
        power: powerConsumptionSum,
      };
      timeAndPowerList.push(timeAndPower);
    });
    timeAndPowerList.sort((a, b) => a.time.getTime() - b.time.getTime());
    let labels: string[] = [];
    let powerConsumption: number[] = [];
    timeAndPowerList.forEach((timeAndPowerEntry) => {
      labels.push(timeAndPowerEntry.time.getTime().toString());
      powerConsumption.push(timeAndPowerEntry.power);
    });
    return {
      labels: labels,
      powerConsumption: powerConsumption,
    };
  }

  sendRequest(household: string, startDate: string, endDate: string) {
    return [
      {
        id: '931859e6-12d6-4c9b-817a-3aaebe9ee533',
        readingTime: '2023-05-06T12:00Z',
        meterId: 'b52ac10f-58cc-6172-a567-0e02b2c3d479',
        propertyValues: [
          {
            operationalPropertyDef: '1.7.0',
            value: 133.0,
            unit: 'kW',
          },
          {
            operationalPropertyDef: '1.8.0',
            value: 1136784.0,
            unit: 'kWh',
          },
          {
            operationalPropertyDef: '2.7.0',
            value: 0.0,
            unit: 'kWh',
          },
          {
            operationalPropertyDef: '2.8.0',
            value: 0.0,
            unit: 'kWh',
          },
          {
            operationalPropertyDef: '4.8.0',
            value: 717736.0,
            unit: 'kvarh',
          },
          {
            operationalPropertyDef: '16.7.0',
            value: 154.0,
            unit: 'kW',
          },
          {
            operationalPropertyDef: '31.7.0',
            value: 0.99,
            unit: 'A',
          },
          {
            operationalPropertyDef: '32.7.0',
            value: 229.4,
            unit: 'V',
          },
          {
            operationalPropertyDef: '51.7.0',
            value: 0.42,
            unit: 'A',
          },
          {
            operationalPropertyDef: '52.7.0',
            value: 228.8,
            unit: 'V',
          },
        ],
      },
      {
        id: '2ec21bdf-2f47-40be-874b-fb7fa8bf75fe',
        readingTime: '2023-05-06T14:00Z',
        meterId: 'b52ac10f-58cc-6172-a567-0e02b2c3d479',
        propertyValues: [
          {
            operationalPropertyDef: '1.7.0',
            value: 145.0,
            unit: 'kW',
          },
          {
            operationalPropertyDef: '1.8.0',
            value: 1136792.0,
            unit: 'kWh',
          },
          {
            operationalPropertyDef: '2.7.0',
            value: 3.0,
            unit: 'kWh',
          },
          {
            operationalPropertyDef: '2.8.0',
            value: 4.0,
            unit: 'kWh',
          },
          {
            operationalPropertyDef: '4.8.0',
            value: 717745.0,
            unit: 'kvarh',
          },
          {
            operationalPropertyDef: '16.7.0',
            value: 170.0,
            unit: 'kW',
          },
          {
            operationalPropertyDef: '31.7.0',
            value: 1.2,
            unit: 'A',
          },
          {
            operationalPropertyDef: '32.7.0',
            value: 230.3,
            unit: 'V',
          },
          {
            operationalPropertyDef: '51.7.0',
            value: 0.54,
            unit: 'A',
          },
          {
            operationalPropertyDef: '52.7.0',
            value: 229.5,
            unit: 'V',
          },
        ],
      },
      {
        id: '7d78c51b-a63f-4ddb-a702-c1ee900f8d48',
        readingTime: '2023-05-06T13:00Z',
        meterId: 'b52ac10f-58cc-6172-a567-0e02b2c3d479',
        propertyValues: [
          {
            operationalPropertyDef: '1.7.0',
            value: 140.0,
            unit: 'kW',
          },
          {
            operationalPropertyDef: '1.8.0',
            value: 1136790.0,
            unit: 'kWh',
          },
          {
            operationalPropertyDef: '2.7.0',
            value: 1.0,
            unit: 'kWh',
          },
          {
            operationalPropertyDef: '2.8.0',
            value: 2.0,
            unit: 'kWh',
          },
          {
            operationalPropertyDef: '4.8.0',
            value: 717740.0,
            unit: 'kvarh',
          },
          {
            operationalPropertyDef: '16.7.0',
            value: 160.0,
            unit: 'kW',
          },
          {
            operationalPropertyDef: '31.7.0',
            value: 1.1,
            unit: 'A',
          },
          {
            operationalPropertyDef: '32.7.0',
            value: 229.9,
            unit: 'V',
          },
          {
            operationalPropertyDef: '51.7.0',
            value: 0.49,
            unit: 'A',
          },
          {
            operationalPropertyDef: '52.7.0',
            value: 229.0,
            unit: 'V',
          },
        ],
      },
    ];
  }
}
