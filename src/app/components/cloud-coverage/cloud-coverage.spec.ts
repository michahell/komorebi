import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudCoverage } from './cloud-coverage';
import { MOCK_TODAY_DATA } from '../../services/komorebi.mock';

describe('CloudCoverage', () => {
  let component: CloudCoverage;
  let fixture: ComponentFixture<CloudCoverage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudCoverage],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudCoverage);
    fixture.componentRef.setInput('today', MOCK_TODAY_DATA);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
