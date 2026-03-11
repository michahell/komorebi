import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verdict } from './verdict';
import { MOCK_TODAY_DATA } from '../../services/komorebi.mock';

describe('Verdict', () => {
  let component: Verdict;
  let fixture: ComponentFixture<Verdict>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verdict],
    }).compileComponents();

    fixture = TestBed.createComponent(Verdict);
    fixture.componentRef.setInput('verdictScores', {
      sunriseScore: 10,
      sunriseText: 'Great',
      sunsetScore: 10,
      sunsetText: 'Great',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
