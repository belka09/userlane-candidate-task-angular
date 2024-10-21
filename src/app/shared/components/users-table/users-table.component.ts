import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { User } from '../../models/user';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { StatusColorPipe } from '../../pipes/status-color.pipe';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatChipsModule,
    StatusColorPipe,
    MatIconModule,
    MatInputModule,
    UserEditComponent,
    MatDialogModule,
  ],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = [
    'edit',
    'firstName',
    'email',
    'birthDate',
    'role',
    'status',
    'remove',
  ];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users$: Observable<User[]> | undefined;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.loadUsers();

    this.userService.users$.subscribe((users) => {
      this.updateTableData(users);
    });

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const dataStr =
        `${data.firstName} ${data.lastName} ${data.email} ${data.role}`.toLowerCase();
      return dataStr.includes(filter.trim().toLowerCase());
    };

    this.dataSource.sortingDataAccessor = (user: User, property: string) => {
      if (property === 'birthDate') {
        return new Date(user.dob);
      }
      return (user as any)[property];
    };
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onEdit(user: User): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      panelClass: 'dialog-container',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedUser = { ...user, ...result };
        this.userService.updateUser(updatedUser);
      }
    });
  }

  public onAddUser(): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      panelClass: 'dialog-container',
      data: { user: new User() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newUser = {
          ...result,
          id: this.userService.generateNewId(this.dataSource.data).toString(),
        };
        this.userService.addUser(newUser);
      }
    });
  }

  public onRemove(user: User): void {
    this.userService.deleteUser(user.id);
  }

  public updateTableData(users: User[]): void {
    this.dataSource.data = users;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.cdr.markForCheck();
  }
}
