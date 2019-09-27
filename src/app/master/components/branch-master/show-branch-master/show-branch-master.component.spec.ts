import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBranchMasterComponent } from './show-branch-master.component';

describe('ShowBranchMasterComponent', () => {
  let component: ShowBranchMasterComponent;
  let fixture: ComponentFixture<ShowBranchMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBranchMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBranchMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
