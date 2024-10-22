import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading } from './core/store/users/users.selector';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatProgressSpinnerModule,
  ],
})
export class AppComponent {
  title = 'Userlane Angular Task';
  loading$: Observable<boolean>;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    this.loading$ = this.store.pipe(select(selectLoading));
    this.loading$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }
}
