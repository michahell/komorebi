import { EventData } from 'services/golden-hour.model';

export interface TodayData {
  sunrise: MappedEventData;
  sunset: MappedEventData;
  weather: any;
}

export interface MappedEventData extends EventData {
  timeBlueHourStart: string;
  timeBlueHourEnd: string;
  timeGoldenHourStart: string;
  timeGoldenHourEnd: string;
  discreteBlueHourStart: number;
  discreteBlueHourEnd: number;
  discreteGoldenHourStart: number;
  discreteGoldenHourEnd: number;
}
