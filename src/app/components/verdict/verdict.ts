import { Component, input } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'kr-verdict',
  imports: [TuiIcon, NgTemplateOutlet],
  templateUrl: './verdict.html',
  styleUrl: './verdict.css',
})
export class Verdict {
  verdictScores = input.required<{
    sunriseScore: number;
    sunriseText: string;
    sunsetScore: number;
    sunsetText: string;
  }>();
}
