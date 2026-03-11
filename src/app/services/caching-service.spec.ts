import { TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CachingService } from './caching-service';

describe('CachingService', () => {
  let service: CachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CachingService],
    });
    service = TestBed.inject(CachingService);

    // Mock localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('naiveGetCache', () => {
    it('should return parsed item from localStorage if it exists', () => {
      const key = 'test-key';
      const value = { data: 'test-value' };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(value));

      const result = service.naiveGetCache(key);

      expect(localStorage.getItem).toHaveBeenCalledWith(key);
      expect(result).toEqual(value);
    });

    it('should return null if item does not exist in localStorage', () => {
      const key = 'non-existent-key';
      vi.mocked(localStorage.getItem).mockReturnValue(null);

      const result = service.naiveGetCache(key);

      expect(localStorage.getItem).toHaveBeenCalledWith(key);
      expect(result).toBeNull();
    });
  });

  describe('naiveSetCache', () => {
    it('should store stringified item in localStorage', () => {
      const key = 'test-key';
      const value = { data: 'test-value' };

      service.naiveSetCache(key, value);

      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
    });
  });

  describe('naiveRemoveCache', () => {
    it('should remove item from localStorage', () => {
      const key = 'test-key';

      service.naiveRemoveCache(key);

      expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    });
  });
});
