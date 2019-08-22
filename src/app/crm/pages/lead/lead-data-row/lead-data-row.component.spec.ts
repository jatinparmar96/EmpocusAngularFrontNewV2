import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDataRowComponent } from './lead-data-row.component';

describe('LeadDataRowComponent', () => {
  let component: LeadDataRowComponent;
  let fixture: ComponentFixture<LeadDataRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDataRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDataRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
