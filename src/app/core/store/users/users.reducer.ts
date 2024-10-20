import { createReducer, on } from '@ngrx/store';
import { UsersState } from './users.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { UsersActions } from './users.action';
import { User } from 'src/app/shared/models/user';

export const featureKey = 'users';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = adapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null,
  isCached: false,
});

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => {
    if (users.length > 0) {
      return adapter.setAll(users, {
        ...state,
        loading: false,
        isCached: true,
      });
    } else {
      return {
        ...state,
        loading: false,
        isCached: false,
      };
    }
  }),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UsersActions.clearUsersCache, (state) => ({
    ...state,
    users: [],
    isCached: false,
  })),
  on(UsersActions.updateUser, (state, { user }) =>
    adapter.updateOne({ id: user.id, changes: user }, state)
  )
);
