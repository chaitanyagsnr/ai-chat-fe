import { TestBed } from '@angular/core/testing';

import { TextStreamService } from './text-stream.service';

describe('TextStreamService', () => {
  let service: TextStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
