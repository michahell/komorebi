import { Component, computed, input, Signal } from '@angular/core';
import { MagicHourBar } from 'components/magic-hour-bar/magic-hour-bar';
import { TodayData } from 'services/komorebi.model';

@Component({
  selector: 'kr-magic-hours',
  imports: [MagicHourBar],
  templateUrl: './magic-hours.html',
  styleUrl: './magic-hours.css',
})
export class MagicHours {
  today = input.required<TodayData>();

  discreteBlueHours: Signal<{
    sunrise: { bhs: number; bhe: number };
    sunset: { bhs: number; bhe: number };
  } | null> = computed(() => {
    const today = this.today();
    if (today) {
      return {
        sunrise: {
          bhs: today.sunrise.discreteBlueHourStart,
          bhe: today.sunrise.discreteBlueHourEnd,
        },
        sunset: {
          bhs: today.sunset.discreteBlueHourStart,
          bhe: today.sunset.discreteBlueHourEnd,
        },
      };
    }
    return null;
  });

  discreteGoldenHours: Signal<{
    sunrise: { ghs: number; ghe: number };
    sunset: { ghs: number; ghe: number };
  } | null> = computed(() => {
    const today = this.today();
    if (today) {
      return {
        sunrise: {
          ghs: today.sunrise.discreteGoldenHourStart,
          ghe: today.sunrise.discreteGoldenHourEnd,
        },
        sunset: {
          ghs: today.sunset.discreteGoldenHourStart,
          ghe: today.sunset.discreteGoldenHourEnd,
        },
      };
    }
    return null;
  });
}
