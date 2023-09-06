import { TestBed } from '@angular/core/testing';

import { NnLoginService } from './nn-login.service';

describe('NnLoginService', () => {
  let service: NnLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NnLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
