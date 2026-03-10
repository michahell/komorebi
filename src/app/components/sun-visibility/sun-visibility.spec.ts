import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunVisibility } from './sun-visibility';

describe('SunVisibility', () => {
  let component: SunVisibility;
  let fixture: ComponentFixture<SunVisibility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunVisibility],
    }).compileComponents();

    fixture = TestBed.createComponent(SunVisibility);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
