import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunVisibility } from './sun-visibility';
import { MOCK_TODAY_DATA } from '../../services/komorebi.mock';

describe('SunVisibility', () => {
  let component: SunVisibility;
  let fixture: ComponentFixture<SunVisibility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunVisibility],
    }).compileComponents();

    fixture = TestBed.createComponent(SunVisibility);
    fixture.componentRef.setInput('today', MOCK_TODAY_DATA);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
