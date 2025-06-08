import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { providePrimeNG } from 'primeng/config';


import { routes } from './app.routes';
import {StintLab} from "./app.theme";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: StintLab,
            options: {
                darkModeSelector: '.dark-mode'
            }
        },
    }),
    importProvidersFrom(LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      disableConsoleLogging: false
    }))
  ]
};
