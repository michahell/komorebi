import { Component, computed, effect, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { TuiProgressBar, TuiProgressColorSegments } from '@taiga-ui/kit';
import { TUI_IS_E2E } from '@taiga-ui/cdk';
import { AsyncPipe, isPlatformServer } from '@angular/common';
import { delay, of, timer } from 'rxjs';
import { TuiIcon } from '@taiga-ui/core';
import { LocationService } from 'services/location.service';
import { Location } from 'services/location.model';
import { KomorebiService } from 'services/komorebi.service';
import { format } from 'date-fns/format';
import { TodayData } from 'services/komorebi.model';
import { MagicHourBar } from 'components/magic-hour-bar/magic-hour-bar';

@Component({
  selector: 'app-today',
  imports: [TuiProgressBar, TuiProgressColorSegments, AsyncPipe, TuiIcon, MagicHourBar],
  templateUrl: './today.html',
  styleUrl: './today.css',
})
export default class Today {
  #locationService = inject(LocationService);
  #komorebiService = inject(KomorebiService);
  readonly #animationDisabled = inject(TUI_IS_E2E) || isPlatformServer(inject(PLATFORM_ID));

  protected readonly fastValue$ = this.#animationDisabled ? of(80) : timer(50, 50);
  protected readonly slowValue$ = this.#animationDisabled ? of(4) : of(100).pipe(delay(1500));

  protected readonly colors = [
    'var(--tui-chart-categorical-01)',
    'var(--tui-chart-categorical-21)',
    'lightskyblue',
    '#3682db',
    'var(--tui-background-accent-1)',
  ];

  #mockSunVisibility = [0, 0, 0, 0, 5, 30, 60, 80, 85, 90, 85, 80, 75, 70, 65, 70, 75, 80, 70, 40, 10, 0, 0, 0];

  protected readonly colorsSunViz = this.#mockSunVisibility.map((visibility, index) => {
    return `rgba(251, 146, 60, ${visibility / 100})`;
  });

  title: Signal<string> = signal('木漏れ日 · KOMOREBI');
  location: Signal<Location | void> = this.#locationService.getLocation();
  cityAndCountry: Signal<string> = computed(() => {
    const location = this.location();
    return location ? `${location.city}, ${location.countryCode}` : '';
  });
  currentDate = signal(format(new Date(), 'ccc, PP'));
  currentTime = signal(format(new Date(), 'HH:mm'));
  today = signal<TodayData | null>(null);
  discreteMagicHours: Signal<{
    sunrise: { bhs: number; bhe: number; ghs: number; ghe: number };
    sunset: { bhs: number; bhe: number; ghs: number; ghe: number };
  } | null> = computed(() => {
    const today = this.today();
    if (today) {
      return {
        sunrise: {
          bhs: today.sunrise.discreteBlueHourStart,
          bhe: today.sunrise.discreteBlueHourEnd,
          ghs: today.sunrise.discreteGoldenHourStart,
          ghe: today.sunrise.discreteGoldenHourEnd,
        },
        sunset: {
          bhs: today.sunset.discreteBlueHourStart,
          bhe: today.sunset.discreteBlueHourEnd,
          ghs: today.sunset.discreteGoldenHourStart,
          ghe: today.sunset.discreteGoldenHourEnd,
        },
      };
    }
    return null;
  });
  goldenHourData = signal({ morningStart: '06:00', morningEnd: '07:00', eveningStart: '17:00', eveningEnd: '17:30' });

  constructor() {
    effect(() => {
      const location = this.location();
      if (location) {
        this.#komorebiService
          .getToday(location.latitude, location.longitude, format(new Date(), 'yyyy-MM-dd'))
          .subscribe(todayData => {
            console.log('komorebi for today: ', todayData);
            this.today.set(todayData);
          });
      }
    });
  }

  #formatHour(date: string): string {
    return format(new Date(), 'HH:mm');
  }
}
