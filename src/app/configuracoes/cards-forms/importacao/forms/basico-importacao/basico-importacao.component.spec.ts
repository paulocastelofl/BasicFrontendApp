import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicoImportacaoComponent } from './basico-importacao.component';

describe('BasicoImportacaoComponent', () => {
  let component: BasicoImportacaoComponent;
  let fixture: ComponentFixture<BasicoImportacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicoImportacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicoImportacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
