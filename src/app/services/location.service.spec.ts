import { TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LocationService } from './location.service';
import { nearestCity } from 'cityjs';
import { Injector, runInInjectionContext } from '@angular/core';

// Mock cityjs
vi.mock('cityjs', () => ({
  nearestCity: vi.fn(),
}));

describe('LocationService', () => {
  let service: LocationService;
  let injector: Injector;

  const mockPosition = {
    coords: {
      latitude: 52.3676,
      longitude: 4.9041,
    },
  } as GeolocationPosition;

  const mockCity = {
    name: 'Amsterdam',
    countryCode: 'NL',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationService],
    });
    service = TestBed.inject(LocationService);
    injector = TestBed.inject(Injector);

    // Default mock for navigator.geolocation
    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: vi.fn(),
      },
    });

    vi.mocked(nearestCity).mockReturnValue(mockCity as any);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocation', () => {
    it('should return location when geolocation is successful', async () => {
      vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation((success: any) => {
        success(mockPosition);
      });

      const locationSignal = runInInjectionContext(injector, () => service.getLocation());

      // Wait for the promise inside getLocation to resolve
      await new Promise(resolve => setTimeout(resolve, 0));

      const location = locationSignal();
      expect(location).toEqual({
        city: 'Amsterdam',
        countryCode: 'NL',
        latitude: '52.3676',
        longitude: '4.9041',
      });
      expect(nearestCity).toHaveBeenCalledWith({
        latitude: 52.3676,
        longitude: 4.9041,
      });
      expect(service.locationError()).toBeNull();
    });

    it('should handle PERMISSION_DENIED error', async () => {
      const error = {
        code: 1,
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError;

      vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation((_, errorCallback: any) => {
        errorCallback(error);
      });

      runInInjectionContext(injector, () => service.getLocation());
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(service.locationError()).toEqual({
        errorCode: 1,
        errorDescription: 'User denied the request for Geolocation.',
      });
    });

    it('should handle POSITION_UNAVAILABLE error', async () => {
      const error = {
        code: 2,
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError;

      vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation((_, errorCallback: any) => {
        errorCallback(error);
      });

      runInInjectionContext(injector, () => service.getLocation());
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(service.locationError()).toEqual({
        errorCode: 2,
        errorDescription: 'Location information is unavailable.',
      });
    });

    it('should handle TIMEOUT error', async () => {
      const error = {
        code: 3,
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationPositionError;

      vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation((_, errorCallback: any) => {
        errorCallback(error);
      });

      runInInjectionContext(injector, () => service.getLocation());
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(service.locationError()).toEqual({
        errorCode: 3,
        errorDescription: 'The request to get user location timed out.',
      });
    });

    it('should handle case when geolocation is not supported', async () => {
      // Stub navigator with an object that has NO geolocation property
      vi.stubGlobal('navigator', {
        userAgent: 'test',
        geolocation: undefined,
      });

      runInInjectionContext(injector, () => service.getLocation());
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(service.locationError()).toEqual({
        errorCode: 4,
        errorDescription: '',
      });
    });
  });
});
