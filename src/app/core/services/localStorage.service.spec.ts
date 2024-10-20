import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './localStorage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  const testKey = 'testKey';
  const testValue = { data: 'testValue' };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set an item in localStorage', () => {
    service.setItem(testKey, testValue);
    const storedValue = localStorage.getItem(testKey);
    expect(storedValue).toBe(JSON.stringify(testValue));
  });

  it('should get an item from localStorage', () => {
    localStorage.setItem(testKey, JSON.stringify(testValue));
    const retrievedValue = service.getItem(testKey);
    expect(retrievedValue).toEqual(testValue);
  });

  it('should return null for a non-existent item', () => {
    const retrievedValue = service.getItem('nonExistentKey');
    expect(retrievedValue).toBeNull();
  });

  it('should remove an item from localStorage', () => {
    localStorage.setItem(testKey, JSON.stringify(testValue));
    service.removeItem(testKey);
    const storedValue = localStorage.getItem(testKey);
    expect(storedValue).toBeNull();
  });

  it('should clear all items from localStorage', () => {
    localStorage.setItem(testKey, JSON.stringify(testValue));
    localStorage.setItem(
      'anotherKey',
      JSON.stringify({ data: 'anotherValue' })
    );
    service.clear();
    expect(localStorage.getItem(testKey)).toBeNull();
    expect(localStorage.getItem('anotherKey')).toBeNull();
  });
});
