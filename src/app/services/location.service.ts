import { Injectable, Signal } from '@angular/core';
import { from } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { nearestCity } from 'cityjs';
import { Location } from 'services/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getLocation(): Signal<Location | void> {
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

  #handleGeolocationErrors(error: GeolocationPositionError): void {
    let errorString = '';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorString = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorString = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorString = 'The request to get user location timed out.';
        break;
    }
  }
}
