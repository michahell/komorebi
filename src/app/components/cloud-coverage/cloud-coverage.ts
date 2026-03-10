import { Component, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TuiProgressBar, TuiProgressColorSegments } from '@taiga-ui/kit';
import { delay, of } from 'rxjs';
import { TodayData } from 'services/komorebi.model';

@Component({
  selector: 'kr-cloud-coverage',
  imports: [AsyncPipe, TuiProgressBar, TuiProgressColorSegments],
  templateUrl: './cloud-coverage.html',
  styleUrl: './cloud-coverage.css',
})
export class CloudCoverage {
  readonly today = input.required<TodayData>();
  readonly slowValue$ = of(100).pipe(delay(1500));
}
