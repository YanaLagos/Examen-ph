import { TestBed } from '@angular/core/testing';
import { CamaraServicioService } from './camara.service';

describe('CamaraService', () => {
  let service: CamaraServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamaraServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
