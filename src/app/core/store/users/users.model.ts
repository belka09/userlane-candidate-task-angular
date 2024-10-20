import { EntityState } from '@ngrx/entity';
import { User } from 'src/app/shared/models/user';

export interface AppState {
  users: EntityState<User>;
}

export interface UsersState extends EntityState<User> {
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;
  isCached: boolean;
}
