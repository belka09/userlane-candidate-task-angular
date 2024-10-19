import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, featureKey } from './users.reducer';
import { UsersState } from './users.model';
import { User } from 'src/app/shared/models/user';

const emptyUser: User = {
  firstName: '',
  email: '',
  role: 'user',
} as User;

export const selectUsersState = createFeatureSelector<UsersState>(featureKey);

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectUsersEntities = createSelector(
  selectUsersState,
  selectEntities
);

export const selectAllUsers = createSelector(selectUsersState, selectAll);

export const selectCurrentUserId = createSelector(
  selectUsersState,
  (state) => state.selectedUserId
);

export const selectCurrentUser = createSelector(
  selectUsersEntities,
  selectCurrentUserId,
  (userEntities, userId) => (userId ? userEntities[userId] : emptyUser)
);
