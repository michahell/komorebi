import { Injectable, signal, Signal } from '@angular/core';
import { from } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { nearestCity } from 'cityjs';
import { Location } from 'services/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationError = signal<{ errorCode: number; errorDescription: string } | null>(null);
  getLocation(): Signal<Location | void> {
    this.locationError.set(null);
    const promise: Promise<Location | void> = this.#getBrowserLocation()
      .then(position => this.#onGetLocation(position))
      .catch(error => this.#handleGeolocationErrors(error));
    return toSignal(from(promise));
  }

  async #getBrowserLocation(): Promise<GeolocationPosition> {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position),
          error => reject(error)
        );
      } else {
        reject(4);
      }
    });
  }

  #onGetLocation(position: GeolocationPosition): Location {
    const cityNearMe = nearestCity({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    return {
      city: cityNearMe.name,
      countryCode: cityNearMe.countryCode,
      latitude: position.coords.latitude.toString(),
      longitude: position.coords.longitude.toString(),
    };
  }

  #handleGeolocationErrors(error: GeolocationPositionError | number): void {
    let errorDescription = '';
    const code = typeof error === 'number' ? error : error.code;

    if (typeof error !== 'number') {
      switch (code) {
        case error.PERMISSION_DENIED:
          errorDescription = 'User denied the request for Geolocation.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorDescription = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorDescription = 'The request to get user location timed out.';
          break;
      }
    }

    this.locationError.set({
      errorCode: code,
      errorDescription,
    });
  }
}
