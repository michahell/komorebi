import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { delay, of, timer } from 'rxjs';
import { TuiIcon } from '@taiga-ui/core';
import { LocationService } from 'services/location.service';
import { Location } from 'services/location.model';
import { KomorebiFacade } from 'services/komorebi.facade';
import { format } from 'date-fns/format';
import { TodayData } from 'services/komorebi.model';
import { MagicHours } from 'components/magic-hours/magic-hours';
import { SunVisibility } from 'components/sun-visibility/sun-visibility';
import { CloudCoverage } from 'components/cloud-coverage/cloud-coverage';
import { WeatherInfo } from 'components/weather-info/weather-info';

@Component({
  selector: 'kr-today',
  imports: [TuiIcon, MagicHours, SunVisibility, CloudCoverage, WeatherInfo],
  templateUrl: './today.html',
  styleUrl: './today.css',
})
export default class Today {
  readonly #locationService = inject(LocationService);
  readonly #komorebiFacade = inject(KomorebiFacade);

  protected readonly fastValue$ = timer(50, 50);
  protected readonly slowValue$ = of(100).pipe(delay(1500));

  protected readonly colors = [
    'var(--tui-chart-categorical-01)',
    'var(--tui-chart-categorical-21)',
    'lightskyblue',
    '#3682db',
    'var(--tui-background-accent-1)',
  ];

  title: Signal<string> = signal('木漏れ日 · KOMOREBI');
  location: Signal<Location | void> = this.#locationService.getLocation();
  cityAndCountry: Signal<string> = computed(() => {
    const location = this.location();
    return location ? `${location.city}, ${location.countryCode}` : '';
  });
  currentDate = signal(format(new Date(), 'ccc, PP'));
  currentTime = signal(format(new Date(), 'HH:mm'));
  today = signal<TodayData | null>(null);

  constructor() {
    effect(() => {
      const location = this.location();
      if (location) {
        this.#komorebiFacade
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
