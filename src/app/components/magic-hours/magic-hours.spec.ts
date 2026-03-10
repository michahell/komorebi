import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicHours } from './magic-hours';

describe('MagicHours', () => {
  let component: MagicHours;
  let fixture: ComponentFixture<MagicHours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicHours],
    }).compileComponents();

    fixture = TestBed.createComponent(MagicHours);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
