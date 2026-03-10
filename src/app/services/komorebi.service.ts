import { inject, Injectable } from '@angular/core';
import { GoldenHourService } from 'services/golden-hour-service';
import { WeatherService } from 'services/weather-service';
import { CachingService } from 'services/caching-service';
import { forkJoin, map, Observable, of, take, tap } from 'rxjs';
import { EventData } from 'services/golden-hour.model';
import { MappedEventData, TodayData } from 'services/komorebi.model';
import { format } from 'date-fns/format';
import { parseJSON } from 'date-fns/parseJSON';

@Injectable({
  providedIn: 'root',
})
export class KomorebiService {
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
      console.log('cache hit for todays golden hour data!');
      return of(cachedToday);
    }
    // no existing cache hits for these coordinates, today,
    // so we request new golden hour data from our API
    return forkJoin([
      this.#goldenHourService.getEvent(latitude, longitude, date, 'sunrise'),
      this.#goldenHourService.getEvent(latitude, longitude, date, 'sunset'),
    ]).pipe(
      map(([sunrise, sunset]) => ({
        sunrise: this.#mapEventData(sunrise),
        sunset: this.#mapEventData(sunset),
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

  // getForecast(): Observable<any> {}
}
