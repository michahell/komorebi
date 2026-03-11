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
  visibility_min: number;
  visibility_mean: number;
  visibility_max: number;
  // fog
  fog_probability: number;
  // precipitation
  precipitation: number;
  // air quality
  airqualityindex_min: number;
  airqualityindex_mean: number;
  airqualityindex_max: number;
}
