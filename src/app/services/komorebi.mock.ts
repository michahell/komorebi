import { TodayData } from './komorebi.model';
import { EventData } from './golden-hour.model';
import { GetWeatherApiResponse } from './weather.model';

export const MOCK_TODAY_DATA: TodayData = {
  sunrise: {
    timeBlueHourStart: '06:00',
    timeBlueHourEnd: '06:30',
    timeGoldenHourStart: '06:30',
    timeGoldenHourEnd: '07:30',
    discreteBlueHourStart: 600,
    discreteBlueHourEnd: 630,
    discreteGoldenHourStart: 630,
    discreteGoldenHourEnd: 730,
    time: '2026-03-11T07:00:00Z',
  } as any,
  sunset: {
    timeBlueHourStart: '18:00',
    timeBlueHourEnd: '18:30',
    timeGoldenHourStart: '17:30',
    timeGoldenHourEnd: '18:00',
    discreteBlueHourStart: 1800,
    discreteBlueHourEnd: 1830,
    discreteGoldenHourStart: 1730,
    discreteGoldenHourEnd: 1800,
    time: '2026-03-11T18:00:00Z',
  } as any,
  weather: {
    day: {
      visibility_min: 10000,
      visibility_mean: 15000,
      visibility_max: 20000,
      fog_probability: 0,
      precipitation: 0,
      airqualityindex_min: 10,
      airqualityindex_mean: 20,
      airqualityindex_max: 30,
    } as any,
    hourly: {
      highclouds: Array(24).fill(0),
      midclouds: Array(24).fill(0),
      lowclouds: Array(24).fill(0),
      sunshinetime: Array(24).fill(0),
    } as any,
  },
};

export const MOCK_EVENT_DATA_SUNRISE: EventData = {
  type: 'sunrise',
  time: '2026-03-11T07:00:00Z',
  magics: {
    blue_hour: ['2026-03-11T07:00:00Z', '2026-03-11T07:30:00Z'],
    golden_hour: ['2026-03-11T07:30:00Z', '2026-03-11T08:30:00Z'],
  },
} as any;

export const MOCK_EVENT_DATA_SUNSET: EventData = {
  type: 'sunset',
  time: '2026-03-11T18:00:00Z',
  magics: {
    blue_hour: ['2026-03-11T19:00:00Z', '2026-03-11T19:30:00Z'],
    golden_hour: ['2026-03-11T18:30:00Z', '2026-03-11T19:00:00Z'],
  },
} as any;

export const MOCK_WEATHER_RESPONSE: GetWeatherApiResponse = {
  data_day: {
    visibility_min: [10000],
    visibility_mean: [15000],
    visibility_max: [20000],
    fog_probability: [0],
    precipitation: [0],
    airqualityindex_min: [10],
    airqualityindex_mean: [20],
    airqualityindex_max: [30],
  },
  data_1h: {
    highclouds: Array(24).fill(0),
    midclouds: Array(24).fill(0),
    lowclouds: Array(24).fill(0),
    sunshinetime: Array(24).fill(0),
  },
} as any;
