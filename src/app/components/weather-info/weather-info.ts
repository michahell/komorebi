import { Component, input } from '@angular/core';
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
}
