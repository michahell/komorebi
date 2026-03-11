import { EventData } from 'services/golden-hour.model';
import { WeatherData1h } from 'services/weather.model';

export interface TodayData {
  sunrise: MappedEventData;
  sunset: MappedEventData;
  weather: {
    day: MappedWeatherData;
    hourly: WeatherData1h;
  };
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

export interface MappedWeatherData {
  // visibility
  visibility_min: any;
  visibility_mean: any;
  visibility_max: any;
  // fog
  fog_probability: any;
  // precipitation
  precipitation: any;
  // air quality
  airqualityindex_min: any;
  airqualityindex_mean: any;
  airqualityindex_max: any;
}
