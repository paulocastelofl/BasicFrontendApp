import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PliComponent } from './pli.component';

describe('PliComponent', () => {
  let component: PliComponent;
  let fixture: ComponentFixture<PliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
