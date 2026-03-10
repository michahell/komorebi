import { Component, signal, Signal } from '@angular/core';
import { CloudCoverage } from 'components/cloud-coverage/cloud-coverage';
import { MagicHours } from 'components/magic-hours/magic-hours';
import { SunVisibility } from 'components/sun-visibility/sun-visibility';
import { TuiIcon } from '@taiga-ui/core';
import { WeatherInfo } from 'components/weather-info/weather-info';
import { AsyncPipe } from '@angular/common';
import { TuiProgressBar, TuiProgressColorSegments } from '@taiga-ui/kit';

@Component({
  selector: 'kr-forecast',
  imports: [TuiIcon, AsyncPipe, TuiProgressBar, TuiProgressColorSegments],
  templateUrl: './forecast.html',
  styleUrl: './forecast.css',
})
export default class Forecast {
  title: Signal<string> = signal('木漏れ日 · KOMOREBI');
}
