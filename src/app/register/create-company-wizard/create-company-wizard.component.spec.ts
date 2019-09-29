import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyWizardComponent } from './create-company-wizard.component';

describe('CreateCompanyWizardComponent', () => {
  let component: CreateCompanyWizardComponent;
  let fixture: ComponentFixture<CreateCompanyWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompanyWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
