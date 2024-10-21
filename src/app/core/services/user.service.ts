import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersActions } from 'src/app/core/store/users/users.action';
import {
  selectAllUsers,
  selectIsCached,
} from 'src/app/core/store/users/users.selector';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$: Observable<User[]>;
  isCached$: Observable<boolean>;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.isCached$ = this.store.select(selectIsCached);
  }

  loadUsers(): void {
    this.isCached$.subscribe((isCached) => {
      if (!isCached) {
        this.store.dispatch(UsersActions.loadUsers());
      }
    });
  }

  addUser(user: User): void {
    this.store.dispatch(UsersActions.addUser({ user }));
  }

  updateUser(user: User): void {
    this.store.dispatch(UsersActions.updateUser({ user }));
  }

  deleteUser(userId: number): void {
    this.store.dispatch(UsersActions.deleteUser({ userId }));
  }

  generateNewId(users: User[]): number {
    return Math.max(...users.map((user) => user.id)) + 1;
  }
}
