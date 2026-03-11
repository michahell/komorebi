import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagicHours } from './magic-hours';
import { MOCK_TODAY_DATA } from 'services/komorebi.mock';
import { provideTailwindBreakpoints } from 'ngx-mq';

describe('MagicHours', () => {
  let component: MagicHours;
  let fixture: ComponentFixture<MagicHours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicHours],
      providers: [provideTailwindBreakpoints()],
    }).compileComponents();

    fixture = TestBed.createComponent(MagicHours);
    fixture.componentRef.setInput('today', MOCK_TODAY_DATA);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
