import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './shared/components/users-table/users-table.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UsersTableComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  title = 'Userlane Angular Task';
}
