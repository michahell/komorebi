import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudCoverage } from './cloud-coverage';

describe('CloudCoverage', () => {
  let component: CloudCoverage;
  let fixture: ComponentFixture<CloudCoverage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudCoverage],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudCoverage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
