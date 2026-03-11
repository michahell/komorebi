import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { EventData, GetEventApiResponse } from 'services/golden-hour.model';

const SUPER_SAFE_API_KEY = '0e7f0931609f9f412eb01013de4d24eb';

@Injectable({
  providedIn: 'root',
})
export class GoldenHourService {
  #http = inject(HttpClient);
  #baseHeaders = new HttpHeaders().set('x-api-key', SUPER_SAFE_API_KEY);
  #baseUrl = 'https://api.sunsethue.com';

  getEvent(latitude: string, longitude: string, date: string, type: string): Observable<EventData> {
    const url = `${this.#baseUrl}/event?latitude=${latitude}&longitude=${longitude}&date=${date}&type=${type}`;
    return this.#http
      .get<GetEventApiResponse>(url, {
        headers: this.#baseHeaders,
      })
      .pipe(map(response => response.data));
  }
}
