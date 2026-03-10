import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GetWeatherApiResponse } from 'services/weather.model';

const SUPER_SAFE_API_KEY = 'WdIkqmVtyYGl8eLE';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = 'https://my.meteoblue.com/packages/basic-day_clouds-day_sunmoon_airquality-day';

  getWeather(latitude: string, longitude: string): Observable<GetWeatherApiResponse> {
    return this.#http.get<GetWeatherApiResponse>(`${this.#baseUrl}?apikey=${SUPER_SAFE_API_KEY}`, {
      params: {
        lat: latitude,
        lon: longitude,
        asl: '31',
        format: 'json',
      },
    });
    // .pipe(map(response => response.data));
  }
}
