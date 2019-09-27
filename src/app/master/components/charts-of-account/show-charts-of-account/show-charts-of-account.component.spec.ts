import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowChartsOfAccountComponent } from './show-charts-of-account.component';

describe('ShowChartsOfAccountComponent', () => {
  let component: ShowChartsOfAccountComponent;
  let fixture: ComponentFixture<ShowChartsOfAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowChartsOfAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowChartsOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
