import { TestBed } from '@angular/core/testing';
import { AvisoServicioService } from './aviso-servicio.service';

describe('AvisoServicioService', () => {
  let service: AvisoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
