import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciamentoCargaComponent } from './agenciamento-carga.component';

describe('AgenciamentoCargaComponent', () => {
  let component: AgenciamentoCargaComponent;
  let fixture: ComponentFixture<AgenciamentoCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenciamentoCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgenciamentoCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
