import { Component, computed, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TuiProgressBar, TuiProgressColorSegments } from '@taiga-ui/kit';
import { delay, of } from 'rxjs';
import { TodayData } from 'services/komorebi.model';

@Component({
  selector: 'kr-cloud-coverage',
  imports: [TuiProgressBar, TuiProgressColorSegments],
  templateUrl: './cloud-coverage.html',
  styleUrl: './cloud-coverage.css',
})
export class CloudCoverage {
  readonly today = input.required<TodayData>();
  readonly slowValue$ = of(100).pipe(delay(1500));

  highCloudCoverageColors = computed(() => this.#mapCloudCoverToColor(this.today().weather.hourly.highclouds));
  midCloudCoverageColors = computed(() => this.#mapCloudCoverToColor(this.today().weather.hourly.midclouds));
  lowCloudCoverageColors = computed(() => this.#mapCloudCoverToColor(this.today().weather.hourly.lowclouds));

  #mapCloudCoverToColor(cloudCover: number[]): string[] {
    return cloudCover.map((cloudCover, index) => {
      return `rgba(255, 255, 255, ${cloudCover / 100})`;
    });
  }
}
