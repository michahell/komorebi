import { Injectable } from '@angular/core';
import { getDate } from 'date-fns/getDate';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  constructor() {}

  naiveGetCache(key: string): any {
    const hit = localStorage.getItem(key);
    if (hit) {
      return JSON.parse(hit);
    }
    return null;
  }

  naiveSetCache(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  naiveRemoveCache(key: string): void {
    localStorage.removeItem(key);
  }
}
