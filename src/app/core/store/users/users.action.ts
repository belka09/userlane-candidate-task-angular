import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Clear Users Cache': emptyProps(),
    'Update User': props<{ user: User }>(),
  },
});

export const UserDetailsActions = createActionGroup({
  source: 'User Details',
  events: {
    'Select User': props<{ userId: string }>(),
    'Update User': props<{ user: User }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: string }>(),
  },
});
