import { Component, computed, input } from '@angular/core';
import { TuiProgressBar, TuiProgressColorSegments } from '@taiga-ui/kit';
import { TodayData } from 'services/komorebi.model';

@Component({
  selector: 'kr-cloud-coverage',
  imports: [TuiProgressBar, TuiProgressColorSegments],
  templateUrl: './cloud-coverage.html',
  styleUrl: './cloud-coverage.css',
})
export class CloudCoverage {
  readonly today = input.required<TodayData>();
  readonly highCloudCoverageColors = computed(() => this.#mapCloudCoverToColor(this.today().weather.hourly.highclouds));
  readonly midCloudCoverageColors = computed(() => this.#mapCloudCoverToColor(this.today().weather.hourly.midclouds));
  readonly lowCloudCoverageColors = computed(() => this.#mapCloudCoverToColor(this.today().weather.hourly.lowclouds));

  #mapCloudCoverToColor(cloudCover: number[]): string[] {
    return cloudCover.map(cloudCover => {
      return `rgba(255, 255, 255, ${cloudCover / 100})`;
    });
  }
}
