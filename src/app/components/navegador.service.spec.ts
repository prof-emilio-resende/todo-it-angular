import { TestBed } from '@angular/core/testing';

import { NavegadorService } from './navegador.service';

describe('NavegadorService', () => {
  let service: NavegadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavegadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
