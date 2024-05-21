import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(MatDialog),
    importProvidersFrom(HttpClientModule),
  ]
};
