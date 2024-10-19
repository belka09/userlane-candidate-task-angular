import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './users.action';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private readonly apiService: ApiService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      exhaustMap(() =>
        this.apiService.fetchUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  );
}
