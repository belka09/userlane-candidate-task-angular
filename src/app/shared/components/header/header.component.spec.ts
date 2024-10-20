import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { By } from '@angular/platform-browser';

class MockLocalStorageService {
  private store: { [key: string]: any } = {};

  setItem(key: string, value: any): void {
    this.store[key] = value;
  }

  getItem(key: string): any {
    return this.store[key] ?? null;
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockLocalStorageService: MockLocalStorageService;

  beforeEach(async () => {
    mockLocalStorageService = new MockLocalStorageService();

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatButtonModule, MatIconModule, HeaderComponent],
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the theme from local storage on init', () => {
    mockLocalStorageService.setItem('isDarkTheme', true);
    component.ngOnInit();
    expect(component.isDarkTheme).toBeTrue();
  });

  it('should toggle the theme and update local storage', () => {
    const toggleButton = fixture.debugElement.query(By.css('.theme-toggle'));
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isDarkTheme).toBeTrue();
    expect(mockLocalStorageService.getItem('isDarkTheme')).toBeTrue();

    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isDarkTheme).toBeFalse();
    expect(mockLocalStorageService.getItem('isDarkTheme')).toBeFalse();
  });

  it('should apply the correct theme attribute to the document', () => {
    component.isDarkTheme = true;
    component.applyTheme();
    expect(document.documentElement.getAttribute('theme')).toBe('dark');

    component.isDarkTheme = false;
    component.applyTheme();
    expect(document.documentElement.getAttribute('theme')).toBe('light');
  });
});
