import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovequestionComponent } from './approvequestion.component';

describe('ApprovequestionComponent', () => {
  let component: ApprovequestionComponent;
  let fixture: ComponentFixture<ApprovequestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovequestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
