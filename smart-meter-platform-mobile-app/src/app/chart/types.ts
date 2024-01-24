export interface ChartType {
  labels: string[];
  powerConsumption: number[];
}

export interface TimeAndPowerType {
  time: Date;
  power: number;
}

export interface MeterReading {
  id: string;
  meterId: string;
  propertyValues: PropertyValue[];
  readingTime: string;
}

export interface PropertyValue {
  operationalPropertyDef: string;
  unit: string;
  value: number;
}
