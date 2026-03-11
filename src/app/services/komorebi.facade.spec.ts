import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { KomorebiFacade } from './komorebi.facade';
import { CachingService } from './caching-service';
import { GoldenHourService } from './golden-hour-service';
import { WeatherService } from './weather-service';
import {
  MOCK_EVENT_DATA_SUNRISE,
  MOCK_EVENT_DATA_SUNSET,
  MOCK_TODAY_DATA,
  MOCK_WEATHER_RESPONSE,
} from './komorebi.mock';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { format } from 'date-fns/format';
import { parseJSON } from 'date-fns/parseJSON';

describe('KomorebiFacade', () => {
  let service: KomorebiFacade;
  let cachingServiceMock: any;
  let goldenHourServiceMock: any;
  let weatherServiceMock: any;

  beforeEach(() => {
    cachingServiceMock = {
      naiveGetCache: vi.fn(),
      naiveSetCache: vi.fn(),
    };
    goldenHourServiceMock = {
      getEvent: vi.fn(),
    };
    weatherServiceMock = {
      getWeather: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        KomorebiFacade,
        { provide: CachingService, useValue: cachingServiceMock },
        { provide: GoldenHourService, useValue: goldenHourServiceMock },
        { provide: WeatherService, useValue: weatherServiceMock },
      ],
    });

    service = TestBed.inject(KomorebiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getToday', () => {
    const lat = '52.3676';
    const long = '4.9041';
    const date = '2026-03-11';
    const expectedCacheKey = '52.36-4.904-2026-03-11-today';

    it('should return cached data if available', async () => {
      cachingServiceMock.naiveGetCache.mockReturnValue(MOCK_TODAY_DATA);

      const result = await firstValueFrom(service.getToday(lat, long, date));

      expect(result).toEqual(MOCK_TODAY_DATA);
      expect(cachingServiceMock.naiveGetCache).toHaveBeenCalledWith(expectedCacheKey);
      expect(goldenHourServiceMock.getEvent).not.toHaveBeenCalled();
      expect(weatherServiceMock.getWeather).not.toHaveBeenCalled();
    });

    it('should fetch data from services and cache it if not in cache', async () => {
      cachingServiceMock.naiveGetCache.mockReturnValue(null);
      goldenHourServiceMock.getEvent.mockImplementation((l: any, lo: any, d: any, type: any) => {
        if (type === 'sunrise') return of(MOCK_EVENT_DATA_SUNRISE);
        if (type === 'sunset') return of(MOCK_EVENT_DATA_SUNSET);
        return of({} as any);
      });
      weatherServiceMock.getWeather.mockReturnValue(of(MOCK_WEATHER_RESPONSE));

      const result = await firstValueFrom(service.getToday(lat, long, date));

      const expectedSunriseBlueHourStartTime = format(
        new Date(parseJSON(MOCK_EVENT_DATA_SUNRISE.magics.blue_hour[0])),
        'HH:mm'
      );

      const expectedSunsetBlueHourStartTime = format(
        new Date(parseJSON(MOCK_EVENT_DATA_SUNSET.magics.blue_hour[0])),
        'HH:mm'
      );

      expect(result.sunrise.timeBlueHourStart).toBe(expectedSunriseBlueHourStartTime);
      expect(result.sunset.timeBlueHourStart).toBe(expectedSunsetBlueHourStartTime);
      expect(result.weather.day.visibility_min).toBe(10000);

      expect(cachingServiceMock.naiveGetCache).toHaveBeenCalledWith(expectedCacheKey);
      expect(goldenHourServiceMock.getEvent).toHaveBeenCalledTimes(2);
      expect(weatherServiceMock.getWeather).toHaveBeenCalledWith(lat, long);
      expect(cachingServiceMock.naiveSetCache).toHaveBeenCalledWith(expectedCacheKey, result);
    });
  });
});
