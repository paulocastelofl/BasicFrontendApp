import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportacaoComponent } from './exportacao.component';

describe('ExportacaoComponent', () => {
  let component: ExportacaoComponent;
  let fixture: ComponentFixture<ExportacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
