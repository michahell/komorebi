import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
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
import { Verdict } from 'components/verdict/verdict';

@Component({
  selector: 'kr-today',
  imports: [TuiIcon, MagicHours, SunVisibility, CloudCoverage, WeatherInfo, Verdict],
  templateUrl: './today.html',
  styleUrl: './today.css',
})
export default class Today {
  readonly #locationService = inject(LocationService);
  readonly #komorebiFacade = inject(KomorebiFacade);

  title: Signal<string> = signal('木漏れ日 · KOMOREBI');
  location: Signal<Location | void> = this.#locationService.getLocation();
  locationError = this.#locationService.locationError;
  cityAndCountry: Signal<string> = computed(() => {
    const location = this.location();
    return location ? `${location.city}, ${location.countryCode}` : '';
  });
  currentDate = signal(format(new Date(), 'ccc, PP'));
  currentTime = signal(format(new Date(), 'HH:mm'));
  today = signal<TodayData | null>(null);
  verdictScores = computed(() => {
    const today = this.today();
    if (!today) return null;
    const sunriseScore = today.sunrise.quality;
    const sunriseText = today.sunrise.quality_text;
    const sunsetScore = today.sunset.quality;
    const sunsetText = today.sunset.quality_text;
    return { sunriseScore, sunsetScore, sunriseText, sunsetText };
  });

  constructor() {
    effect(() => {
      const location = this.location();
      if (location) {
        this.#komorebiFacade
          .getToday(location.latitude, location.longitude, format(new Date(), 'yyyy-MM-dd'))
          .subscribe(todayData => {
            this.today.set(todayData);
          });
      }
    });
  }
}
