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
  on(UsersActions.loadUsersSuccess, (state, { users }) => {
    return adapter.setAll(users, {
      ...state,
      loading: false,
    });
  }),

  on(UserDetailsActions.updateUser, (state, { user }) => {
    return adapter.updateOne({ id: user.id, changes: user }, { ...state });
  }),

  on(UserDetailsActions.updateUserSuccess, (state, { user }) => {
    return adapter.updateOne({ id: user.id, changes: user }, { ...state });
  })
);
