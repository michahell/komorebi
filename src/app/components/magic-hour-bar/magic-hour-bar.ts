import { Component, input } from '@angular/core';

@Component({
  selector: 'app-magic-hour-bar',
  imports: [],
  templateUrl: './magic-hour-bar.html',
  styleUrl: './magic-hour-bar.css',
})
export class MagicHourBar {
  hours = input.required<{
    sunrise: { bhs: number; bhe: number; ghs: number; ghe: number };
    sunset: { bhs: number; bhe: number; ghs: number; ghe: number };
  }>();
}
