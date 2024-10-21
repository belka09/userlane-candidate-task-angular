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
        email: 'john.doe@example.com',
        dob: '1993-01-01',
        role: 'user',
        status: 'Active',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        dob: '1995-02-01',
        role: 'moderator',
        status: 'Active',
      },
    ];

    service.fetchUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should get a user by ID', () => {
    const mockUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dob: '1993-01-01',
      role: 'user',
      status: 'Active',
    };

    service.getUserById(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a new user', () => {
    const newUser: Partial<User> = {
      firstName: 'Alice',
      lastName: 'Wonderland',
      email: 'alice@example.com',
      dob: '1990-12-01',
      role: 'user',
      status: 'Active',
    };

    const createdUser: User = {
      id: 3,
      ...newUser,
    } as User;

    service.createUser(newUser).subscribe((user) => {
      expect(user).toEqual(createdUser);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(createdUser);
  });

  it('should update a user', () => {
    const userId = 1;
    const mockUser: User = {
      id: userId,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dob: '1993-01-01',
      role: 'user',
      status: 'Active',
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

  it('should delete a user', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe(() => {
      expect().nothing();
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
