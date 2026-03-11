import { inject, Injectable } from '@angular/core';
import { GoldenHourService } from 'services/golden-hour-service';
import { WeatherService } from 'services/weather-service';
import { CachingService } from 'services/caching-service';
import { forkJoin, map, Observable, of, take, tap } from 'rxjs';
import { EventData } from 'services/golden-hour.model';
import { MappedEventData, MappedWeatherData, TodayData } from 'services/komorebi.model';
import { format } from 'date-fns/format';
import { parseJSON } from 'date-fns/parseJSON';
import { GetWeatherApiResponse, WeatherDataDay } from 'services/weather.model';

@Injectable({
  providedIn: 'root',
})
export class KomorebiFacade {
  #cachingService = inject(CachingService);
  #goldenHourService = inject(GoldenHourService);
  #weatherService = inject(WeatherService);

  getToday(latitude: string, longitude: string, date: string): Observable<TodayData> {
    // shorten latitude and longitude to make sure that cache hits happen, as
    // on subsequent location requests, lat and long can slightly vary, apparently!
    const shortLat = latitude.slice(0, 5);
    const shortLong = longitude.slice(0, 5);
    const baseCacheKey = `${shortLat}-${shortLong}-${date}`;
    const todayCacheKey = `${baseCacheKey}-today`;
    const cachedToday = this.#cachingService.naiveGetCache(todayCacheKey);

    // first try to get both sunrise and sunset event data from cache
    if (cachedToday) {
      console.log('cache hit for today`s golden hour data!');
      return of(cachedToday);
    }
    // no existing cache hits for these coordinates, today,
    // so we request new golden hour data from our API
    return forkJoin([
      this.#goldenHourService.getEvent(latitude, longitude, date, 'sunrise'),
      this.#goldenHourService.getEvent(latitude, longitude, date, 'sunset'),
      this.#weatherService.getWeather(latitude, longitude),
    ]).pipe(
      map(([sunrise, sunset, weather]) => ({
        sunrise: this.#mapEventData(sunrise),
        sunset: this.#mapEventData(sunset),
        weather: {
          day: this.#mapWeatherData(weather),
          hourly: weather.data_1h,
        },
      })),
      // persist to cache
      tap((todayData: TodayData) => {
        this.#cachingService.naiveSetCache(todayCacheKey, todayData);
      }),
      take(1)
    );
  }

  #mapEventData(eventData: EventData): MappedEventData {
    const timeBlueHourStart = format(new Date(parseJSON(eventData.magics.blue_hour[0])), 'HH:mm');
    const timeBlueHourEnd = format(new Date(parseJSON(eventData.magics.blue_hour[1])), 'HH:mm');
    const timeGoldenHourStart = format(new Date(parseJSON(eventData.magics.golden_hour[0])), 'HH:mm');
    const timeGoldenHourEnd = format(new Date(parseJSON(eventData.magics.golden_hour[1])), 'HH:mm');

    return {
      ...eventData,
      timeBlueHourStart,
      timeBlueHourEnd,
      discreteBlueHourStart: Number(timeBlueHourStart.replace(':', '')),
      discreteBlueHourEnd: Number(timeBlueHourEnd.replace(':', '')),
      timeGoldenHourStart,
      timeGoldenHourEnd,
      discreteGoldenHourStart: Number(timeGoldenHourStart.replace(':', '')),
      discreteGoldenHourEnd: Number(timeGoldenHourEnd.replace(':', '')),
    };
  }

  #mapWeatherData(weather: GetWeatherApiResponse): MappedWeatherData {
    type field = keyof WeatherDataDay;

    const wantedFields: field[] = [
      // low clouds
      'lowclouds_min',
      'lowclouds_mean',
      'lowclouds_max',
      // mid clouds
      'midclouds_min',
      'midclouds_mean',
      'midclouds_max',
      // high clouds
      'highclouds_min',
      'highclouds_mean',
      'highclouds_max',
      // visibility
      'visibility_min',
      'visibility_mean',
      'visibility_max',
      // fog
      'fog_probability',
      // precipitation
      'precipitation',
      // air quality
      'airqualityindex_min',
      'airqualityindex_mean',
      'airqualityindex_max',
    ];

    return Object.entries(weather.data_day).reduce<any>((newMapped, [key, value]) => {
      if (wantedFields.includes(key as field)) {
        newMapped[key] = value;
        return newMapped;
      } else {
        return newMapped;
      }
    }, {});
  }
}
