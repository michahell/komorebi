import { Component, computed, input } from '@angular/core';
import { TuiProgressBar, TuiProgressColorSegments } from '@taiga-ui/kit';
import { TodayData } from 'services/komorebi.model';

@Component({
  selector: 'kr-sun-visibility',
  imports: [TuiProgressBar, TuiProgressColorSegments],
  templateUrl: './sun-visibility.html',
  styleUrl: './sun-visibility.css',
})
export class SunVisibility {
  today = input.required<TodayData>();
  readonly sunVisibilityColors = computed(() =>
    this.#mapSunVisibilityToColor(this.today().weather.hourly.sunshinetime)
  );

  #mapSunVisibilityToColor(sunVisibility: number[]): string[] {
    return sunVisibility.map((sunVisibility, index) => {
      return `rgba(251, 146, 60, ${(sunVisibility / 100) * 2.55} )`;
    });
  }
}
