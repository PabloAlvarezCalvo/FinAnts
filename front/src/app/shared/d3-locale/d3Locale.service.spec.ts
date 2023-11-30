/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { D3LocaleService } from './d3Locale.service';

describe('Service: D3Locale', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D3LocaleService]
    });
  });

  it('should ...', inject([D3LocaleService], (service: D3LocaleService) => {
    expect(service).toBeTruthy();
  }));
});
