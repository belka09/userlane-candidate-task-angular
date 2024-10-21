import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap, of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { UsersActions } from './users.action';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(() =>
        this.apiService.fetchUsers().pipe(
          delay(1000),
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UsersActions.loadUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      mergeMap(({ user }) =>
        this.apiService.updateUser(user.id, user).pipe(
          delay(1000),
          map((updatedUser) =>
            UsersActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error) =>
            of(UsersActions.updateUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.addUser),
      mergeMap(({ user }) =>
        this.apiService.createUser(user).pipe(
          delay(1000),
          map(() => UsersActions.loadUsers()),
          catchError((error) =>
            of(UsersActions.addUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(({ userId }) =>
        this.apiService.deleteUser(userId).pipe(
          delay(1000),
          map(() => UsersActions.deleteUserSuccess({ userId })),
          catchError((error) =>
            of(UsersActions.deleteUserFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
