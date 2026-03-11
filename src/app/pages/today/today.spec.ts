import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { LocationService } from 'services/location.service';
import { KomorebiFacade } from 'services/komorebi.facade';
import { MOCK_TODAY_DATA } from 'services/komorebi.mock';
import Today from './today';
import { provideTailwindBreakpoints } from 'ngx-mq';

describe('Today', () => {
  let component: Today;
  let fixture: ComponentFixture<Today>;
  let locationServiceMock: any;
  let komorebiFacadeMock: any;

  const mockLocation = {
    city: 'Amsterdam',
    countryCode: 'NL',
    latitude: '52.3676',
    longitude: '4.9041',
  };

  beforeEach(async () => {
    locationServiceMock = {
      getLocation: vi.fn().mockReturnValue(signal(null)),
      locationError: signal(null),
    };

    komorebiFacadeMock = {
      getToday: vi.fn().mockReturnValue(of(MOCK_TODAY_DATA)),
    };

    await TestBed.configureTestingModule({
      imports: [Today],
      providers: [
        provideTailwindBreakpoints(),
        { provide: LocationService, useValue: locationServiceMock },
        { provide: KomorebiFacade, useValue: komorebiFacadeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Today);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title()).toBe('木漏れ日 · KOMOREBI');
    expect(component.cityAndCountry()).toBe('');
    expect(component.today()).toBeNull();
    expect(component.verdictScores()).toBeNull();
  });

  it('should update cityAndCountry when location is available', () => {
    locationServiceMock.getLocation.mockReturnValue(signal(mockLocation));

    // Create new fixture to trigger signals/effects
    fixture = TestBed.createComponent(Today);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.cityAndCountry()).toBe('Amsterdam, NL');
  });

  it('should call getToday when location is available', async () => {
    locationServiceMock.getLocation.mockReturnValue(signal(mockLocation));

    fixture = TestBed.createComponent(Today);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(komorebiFacadeMock.getToday).toHaveBeenCalled();
    expect(component.today()).toEqual(MOCK_TODAY_DATA);
  });

  it('should compute verdictScores correctly when today data is set', () => {
    component.today.set(MOCK_TODAY_DATA);

    const scores = component.verdictScores();
    expect(scores).not.toBeNull();
    expect(scores?.sunriseScore).toBe(MOCK_TODAY_DATA.sunrise.quality);
    expect(scores?.sunriseText).toBe(MOCK_TODAY_DATA.sunrise.quality_text);
    expect(scores?.sunsetScore).toBe(MOCK_TODAY_DATA.sunset.quality);
    expect(scores?.sunsetText).toBe(MOCK_TODAY_DATA.sunset.quality_text);
  });
});
