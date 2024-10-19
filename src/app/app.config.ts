import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { featureKey, usersReducer } from './core/store/users/users.reducer';
import { UsersEffects } from './core/store/users/users.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideHttpClient(),
    provideStore({ [featureKey]: usersReducer }),
    provideEffects(UsersEffects),
    importProvidersFrom(MatDialogModule),
  ],
};
