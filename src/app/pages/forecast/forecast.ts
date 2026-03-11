import { Component, signal, Signal } from '@angular/core';

@Component({
  selector: 'kr-forecast',
  imports: [],
  templateUrl: './forecast.html',
  styleUrl: './forecast.css',
})
export default class Forecast {
  title: Signal<string> = signal('木漏れ日 · KOMOREBI');
}
