import { TestBed } from '@angular/core/testing';

import { LlamaApiService } from './llama-api.service';

describe('LlamaApiService', () => {
  let service: LlamaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlamaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
