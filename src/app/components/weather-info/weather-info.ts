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

  visibility = computed(() => {
    return `\
    ${this.today().weather.day.visibility_min / 1000}km, \
    ${this.today().weather.day.visibility_mean / 1000}km, \
    ${this.today().weather.day.visibility_max / 1000}km`;
  });

  airQuality = computed(() => {
    return `\
    ${this.today().weather.day.airqualityindex_min / 10},\
    ${this.today().weather.day.airqualityindex_mean / 10},\
    ${this.today().weather.day.airqualityindex_max / 10}`;
  });
}
