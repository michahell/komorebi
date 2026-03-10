import { Component, input } from '@angular/core';

@Component({
  selector: 'kr-magic-hour-bar',
  imports: [],
  templateUrl: './magic-hour-bar.html',
  styleUrl: './magic-hour-bar.css',
})
export class MagicHourBar {
  blueHours = input<{
    sunrise: { bhs: number; bhe: number };
    sunset: { bhs: number; bhe: number };
  }>();
  goldenHours = input<{
    sunrise: { ghs: number; ghe: number };
    sunset: { ghs: number; ghe: number };
  }>();
}
