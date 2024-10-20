import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { User } from '../../shared/models/user';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  const apiUrl = `${environment.apiBaseUrl}/users`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        gender: 'male',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        username: 'johndoe',
        password: 'password123',
        birthDate: '1993-01-01',
        role: 'user',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        age: 28,
        gender: 'female',
        email: 'jane.doe@example.com',
        phone: '123-456-7891',
        username: 'janedoe',
        password: 'password123',
        birthDate: '1995-02-01',
        role: 'moderator',
      },
    ];

    service.fetchUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ users: mockUsers });
  });

  it('should get a user by ID', () => {
    const mockUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      gender: 'male',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      password: 'password123',
      birthDate: '1993-01-01',
      role: 'user',
    };

    service.getUserById(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should update a user', () => {
    const userId = 1;
    const mockUser: User = {
      id: userId,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      gender: 'male',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      password: 'password123',
      birthDate: '1993-01-01',
      role: 'user',
    };
    const updatedData: Partial<User> = { firstName: 'Johnny' };
    const updatedUser: User = { ...mockUser, ...updatedData };

    service.updateUser(userId, updatedData).subscribe((user) => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${userId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedData);
    req.flush(updatedUser);
  });
});
