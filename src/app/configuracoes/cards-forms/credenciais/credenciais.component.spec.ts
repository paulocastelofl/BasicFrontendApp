import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredenciaisComponent } from './credenciais.component';

describe('CredenciaisComponent', () => {
  let component: CredenciaisComponent;
  let fixture: ComponentFixture<CredenciaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredenciaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredenciaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
