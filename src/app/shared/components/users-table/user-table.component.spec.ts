import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTableComponent } from './users-table.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from '../../models/user';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dob: '1990-01-01',
      role: 'user',
      status: 'Active',
    },
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'loadUsers',
      'addUser',
      'updateUser',
      'deleteUser',
      'generateNewId',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        UsersTableComponent,
      ],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;

    userService.users$ = of(mockUsers);

    userService.loadUsers.and.callFake(() => {
      component.updateTableData(mockUsers);
    });

    fixture.detectChanges();
  });

  it('should create the users table component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on initialization', () => {
    expect(userService.loadUsers).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockUsers);
  });

  it('should apply filter to the table', () => {
    const input = 'John';
    component.applyFilter({ target: { value: input } } as any);

    const filteredData = component.dataSource.data.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(input.toLowerCase())
    );
    expect(component.dataSource.filteredData).toEqual(filteredData);
  });

  it('should call userService.deleteUser when a user is removed', () => {
    component.onRemove(mockUsers[0]);

    expect(userService.deleteUser).toHaveBeenCalledWith(mockUsers[0].id);
  });

  it('should update table data when users are loaded', () => {
    component.updateTableData(mockUsers);
    expect(component.dataSource.data).toEqual(mockUsers);
  });
});
