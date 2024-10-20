import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTableComponent } from './users-table.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  selectAllUsers,
  selectIsCached,
} from 'src/app/core/store/users/users.selector';
import { UsersActions } from 'src/app/core/store/users/users.action';
import { of } from 'rxjs';
import { User } from '../../models/user';
import { By } from '@angular/platform-browser';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;
  let store: MockStore;
  let dialog: MatDialog;

  const mockUsers: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      birthDate: '1990-01-01',
      role: 'user',
      age: 30,
      gender: 'male',
      phone: '123456789',
      username: 'johndoe',
      password: 'password',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        UsersTableComponent,
      ],
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: selectAllUsers, value: mockUsers },
            { selector: selectIsCached, value: false },
          ],
        }),
        { provide: MatDialog, useValue: { open: jasmine.createSpy() } },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the users table component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers action if data is not cached', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    store.overrideSelector(selectIsCached, false);
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(UsersActions.loadUsers());
  });

  it('should update table data when users are loaded', () => {
    component.updateTableData(mockUsers);
    expect(component.dataSource.data).toEqual(mockUsers);
  });
});
