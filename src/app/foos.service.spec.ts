import { TestBed, inject } from '@angular/core/testing';

import { FoosService } from './foos.service';

describe('FoosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoosService]
    });
  });

  it('should ...', inject([FoosService], (service: FoosService) => {
    expect(service).toBeTruthy();
  }));
});
