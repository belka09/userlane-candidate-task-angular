import { createReducer, on } from '@ngrx/store';
import { UsersState } from './users.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { UserDetailsActions, UsersActions } from './users.action';
import { User } from 'src/app/shared/models/user';

export const featureKey = 'users';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = adapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null,
});

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, {
      ...state,
      loading: false,
    })
  ),

  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UsersActions.filterUsers, (state) => ({
    ...state,
  })),

  on(UserDetailsActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
  }))
);
