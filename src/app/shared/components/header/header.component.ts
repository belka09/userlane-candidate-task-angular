import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageService } from 'src/app/core/localStorage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isDarkTheme: boolean = false;
  private readonly themeKey = 'isDarkTheme';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const storedTheme = this.localStorageService.getItem(this.themeKey);
    this.isDarkTheme = storedTheme !== null ? storedTheme : false;

    this.applyTheme();
  }

  toggle(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.localStorageService.setItem(this.themeKey, this.isDarkTheme);
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkTheme) {
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      document.documentElement.setAttribute('theme', 'light');
    }
  }
}
