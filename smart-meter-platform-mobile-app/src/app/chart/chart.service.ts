import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ChartType,
  MeterReading,
  PropertyValue,
  TimeAndPowerType,
} from './types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private httpClient: HttpClient) {}
  private platformUrl = environment.platformUrl;
  private householdUrl = environment.householdUrl;
  private households: { street: string; id: string }[] = [];
  public static userId: string | any = '26bee12b-f97a-4295-a34b-91f857f2e67f';
  public static energyPrice: number | any;

  async getData(
    household: string,
    startDate: Date,
    endDate: Date
  ): Promise<ChartType> {
    let data: MeterReading[] = await this.sendRequest(
      household,
      startDate.toISOString().split('.')[0],
      endDate.toISOString().split('.')[0]
    );

    let timeAndPowerList: TimeAndPowerType[] = [];
    data.forEach((entry: MeterReading) => {
      let powerConsumptionSum = entry.propertyValues
        .filter(
          (propertyValue: PropertyValue) =>
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

  async sendRequest(
    household: string,
    startDate: string,
    endDate: string
  ): Promise<MeterReading[]> {
    let meterId = 'b52ac10f-58cc-6172-a567-0e02b2c3d479';
    let url = `${this.platformUrl}/forInterval?meterId=${meterId}&startDate=${startDate}&endDate=${endDate}`;
    return new Promise<MeterReading[]>((resolve, reject) => {
      this.httpClient.get(url).subscribe(
        (data) => {
          resolve(data as MeterReading[]);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public async getHouseholds(): Promise<{ street: string; id: string }[]> {
    return await this.sendRequestHouseholds();
  }

  async sendRequestHouseholds(): Promise<{ street: string; id: string }[]> {
    let userId = 'b52ac10f-58cc-6172-a567-0e02b2c3d479';
    let url = `${this.householdUrl}/getHouseholdsFromUser/${ChartService.userId}`;
    return new Promise<{ street: string; id: string }[]>((resolve, reject) => {
      this.httpClient.get(url).subscribe(
        (data: any) => {
          this.households = data.map((item: any) => ({
            street: `${item.street} ${item.streetNo}`,
            id: item.id,
          }));
          resolve(this.households);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public setUserId(userId: string): void {
    ChartService.userId = userId;
  }

  public setEnergyPrice(energyPrice: number): void {
    ChartService.energyPrice = energyPrice;
  }
}
