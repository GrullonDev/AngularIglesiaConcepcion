import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getClientesComponent } from './getClientes.component';

describe('DocumentsComponent', () => {
  let component: getClientesComponent;
  let fixture: ComponentFixture<getClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(getClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
