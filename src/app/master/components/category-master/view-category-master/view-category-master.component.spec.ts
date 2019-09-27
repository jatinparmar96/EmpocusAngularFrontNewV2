import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoryMasterComponent } from './view-category-master.component';

describe('ViewCategoryMasterComponent', () => {
  let component: ViewCategoryMasterComponent;
  let fixture: ComponentFixture<ViewCategoryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCategoryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
