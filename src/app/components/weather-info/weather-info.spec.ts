import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherInfo } from './weather-info';
import { MOCK_TODAY_DATA } from '../../services/komorebi.mock';

describe('WeatherInfo', () => {
  let component: WeatherInfo;
  let fixture: ComponentFixture<WeatherInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherInfo);
    fixture.componentRef.setInput('today', MOCK_TODAY_DATA);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
