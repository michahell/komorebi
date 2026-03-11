import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetWeatherApiResponse } from 'services/weather.model';

const SUPER_SAFE_API_KEY = 'WdIkqmVtyYGl8eLE';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = 'https://my.meteoblue.com/packages/basic-1h_basic-day_clouds-1h_clouds-day_airquality-day';

  getWeather(latitude: string, longitude: string): Observable<GetWeatherApiResponse> {
    return this.#http.get<GetWeatherApiResponse>(`${this.#baseUrl}?apikey=${SUPER_SAFE_API_KEY}`, {
      params: {
        lat: latitude,
        lon: longitude,
        format: 'json',
        forecast_days: 1,
      },
    });
  }
}
