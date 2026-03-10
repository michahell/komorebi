import { Component, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TuiProgressBar, TuiProgressColorSegments } from '@taiga-ui/kit';
import { timer } from 'rxjs';
import { TodayData } from 'services/komorebi.model';

@Component({
  selector: 'kr-sun-visibility',
  imports: [AsyncPipe, TuiProgressBar, TuiProgressColorSegments],
  templateUrl: './sun-visibility.html',
  styleUrl: './sun-visibility.css',
})
export class SunVisibility {
  readonly fastValue$ = timer(50, 50);

  #mockSunVisibility = [0, 0, 0, 0, 5, 30, 60, 80, 85, 90, 85, 80, 75, 70, 65, 70, 75, 80, 70, 40, 10, 0, 0, 0];

  readonly colorsSunViz = this.#mockSunVisibility.map((visibility, index) => {
    return `rgba(251, 146, 60, ${visibility / 100})`;
  });

  today = input.required<TodayData>();
}
