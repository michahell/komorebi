import { TuiRoot } from '@taiga-ui/core';
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TuiTabBar } from '@taiga-ui/addon-mobile';
import { routes, RoutesWithIconAndBadge } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiTabBar, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly routes = signal<RoutesWithIconAndBadge[]>(routes as RoutesWithIconAndBadge[]);
}
