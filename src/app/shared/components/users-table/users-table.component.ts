import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { User } from '../../models/user';
import { ApiService } from 'src/app/core/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';

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
  styleUrl: './users-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent implements OnInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [
    'firstName',
    'email',
    'birthDate',
    'role',
    'edit',
  ];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response.users);
      this.dataSource.paginator = this.paginator;
      this.sort.disableClear = true;
      this.dataSource.sort = this.sort;
    });
  }

  onEdit(user: User): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '600px',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
