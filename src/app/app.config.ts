import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideTailwindBreakpoints } from 'ngx-mq';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { corsProxyInterceptor } from 'services/cors-proxy-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideEventPlugins(),
    provideHttpClient(withInterceptors([corsProxyInterceptor])),
    provideTailwindBreakpoints(),
  ],
};
