import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditComponent } from './user-edit.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../../models/user';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UserEditComponent>>;
  const mockUser: User = {
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
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        BrowserAnimationsModule,
        UserEditComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { user: mockUser } },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the user edit component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user data', () => {
    expect(component.userForm.value).toEqual({
      id: mockUser.id,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email,
      birthDate: new Date(mockUser.birthDate),
      role: mockUser.role,
    });
  });

  it('should close the dialog on cancel', () => {
    component.onClose();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog with updated data on save', () => {
    component.userForm.patchValue({ firstName: 'Jane' });
    component.onSave();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      id: mockUser.id,
      firstName: 'Jane',
      lastName: mockUser.lastName,
      email: mockUser.email,
      birthDate: new Date(mockUser.birthDate),
      role: mockUser.role,
    });
  });

  it('should disable save button if form is invalid', () => {
    component.userForm.patchValue({ email: '' });
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelector(
      'button[color="primary"]'
    );
    expect(saveButton.disabled).toBeTrue();
  });
});
