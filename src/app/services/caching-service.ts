import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  naiveGetCache<T = string>(key: string): T | null {
    const hit = localStorage.getItem(key);
    if (hit) {
      return JSON.parse(hit);
    }
    return null;
  }

  naiveSetCache<T = string | object | number | Date>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  naiveRemoveCache(key: string): void {
    localStorage.removeItem(key);
  }
}
