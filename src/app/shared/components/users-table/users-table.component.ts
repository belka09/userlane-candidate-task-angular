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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersActions } from 'src/app/core/store/users/users.action';
import {
  selectAllUsers,
  selectIsCached,
} from 'src/app/core/store/users/users.selector';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
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
    'remove',
  ];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users$: Observable<User[]> | undefined;
  selectedUser$: Observable<User | undefined> | undefined;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectIsCached)).subscribe((isCached) => {
      if (!isCached) {
        this.store.dispatch(UsersActions.loadUsers());
      }
    });

    this.users$ = this.store.pipe(select(selectAllUsers));

    this.users$.subscribe((users) => {
      this.updateTableData(users);
    });
  }

  public onEdit(user: User): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      panelClass: 'dialog-container',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedUser = { ...user, ...result };
        this.store.dispatch(UsersActions.updateUser({ user: updatedUser }));
      }
    });
  }

  public onRemove(user: User): void {
    console.log('Remove', user);
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
