import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UsersActions } from 'src/app/core/store/users/users.action';
import { User } from 'src/app/shared/models/user';
import {
  selectAllUsers,
  selectIsCached,
} from 'src/app/core/store/users/users.selector';
import { Observable } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let store: MockStore;
  let mockUsersSelector: Observable<User[]>;
  let mockIsCachedSelector: Observable<boolean>;

  const initialUsers: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'Active',
      dob: '1990-01-01',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: selectAllUsers, value: initialUsers },
            { selector: selectIsCached, value: false },
          ],
        }),
      ],
    });

    service = TestBed.inject(UserService);
    store = TestBed.inject(MockStore);
    mockUsersSelector = store.select(selectAllUsers);
    mockIsCachedSelector = store.select(selectIsCached);

    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load users if cache is not set', () => {
    service.loadUsers();

    expect(store.dispatch).toHaveBeenCalledWith(UsersActions.loadUsers());
  });

  it('should not load users if cache is set', () => {
    store.overrideSelector(selectIsCached, true);
    service.loadUsers();

    expect(store.dispatch).not.toHaveBeenCalledWith(UsersActions.loadUsers());
  });

  it('should dispatch addUser action', () => {
    const newUser: User = {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      role: 'user',
      status: 'Active',
      dob: '1995-01-01',
    };
    service.addUser(newUser);

    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.addUser({ user: newUser })
    );
  });

  it('should dispatch updateUser action', () => {
    const updatedUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'Inactive',
      dob: '1990-01-01',
    };
    service.updateUser(updatedUser);

    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.updateUser({ user: updatedUser })
    );
  });

  it('should dispatch deleteUser action', () => {
    const userId = 1;
    service.deleteUser(userId);

    expect(store.dispatch).toHaveBeenCalledWith(
      UsersActions.deleteUser({ userId })
    );
  });

  it('should generate new ID', () => {
    const newId = service.generateNewId(initialUsers);

    expect(newId).toBe(2);
  });
});
