import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryMasterComponent } from './create-category-master.component';

describe('CreateCategoryMasterComponent', () => {
  let component: CreateCategoryMasterComponent;
  let fixture: ComponentFixture<CreateCategoryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
