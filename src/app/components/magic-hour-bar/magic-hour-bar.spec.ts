import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicHourBar } from './magic-hour-bar';

describe('MagicHourBar', () => {
  let component: MagicHourBar;
  let fixture: ComponentFixture<MagicHourBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicHourBar],
    }).compileComponents();

    fixture = TestBed.createComponent(MagicHourBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
