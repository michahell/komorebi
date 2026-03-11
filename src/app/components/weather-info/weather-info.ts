import { Component, computed, input } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { TodayData } from 'services/komorebi.model';

@Component({
  selector: 'kr-weather-info',
  imports: [TuiIcon],
  templateUrl: './weather-info.html',
  styleUrl: './weather-info.css',
})
export class WeatherInfo {
  today = input.required<TodayData>();
  fogProbability = computed(() => this.today().weather.day.fog_probability);
  precipitation = computed(() => this.today().weather.day.precipitation);

  visibilityScore = computed(() =>
    this.#naiveScoreFunction(
      this.today().weather.day.visibility_min,
      this.today().weather.day.visibility_mean,
      this.today().weather.day.visibility_max,
      20000
    ).toFixed(2)
  );

  airQualityScore = computed(() =>
    (
      this.#naiveScoreFunction(
        this.today().weather.day.airqualityindex_min,
        this.today().weather.day.airqualityindex_mean,
        this.today().weather.day.airqualityindex_max,
        100
      ) / 10
    ).toFixed(2)
  );

  #naiveScoreFunction(min: number, mean: number, max: number, upperBound: number): number {
    const minScore = (min / upperBound) * 100;
    const meanScore = (mean / upperBound) * 100;
    const maxScore = (max / upperBound) * 100;
    return Number((minScore + meanScore + maxScore) / 3);
  }
}
