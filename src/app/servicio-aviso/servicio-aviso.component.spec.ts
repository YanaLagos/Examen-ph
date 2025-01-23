import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServicioAvisoComponent } from './servicio-aviso.component';

describe('ServicioAvisoComponent', () => {
  let component: ServicioAvisoComponent;
  let fixture: ComponentFixture<ServicioAvisoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ServicioAvisoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicioAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
