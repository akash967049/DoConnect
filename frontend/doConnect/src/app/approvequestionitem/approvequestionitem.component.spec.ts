import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovequestionitemComponent } from './approvequestionitem.component';

describe('ApprovequestionitemComponent', () => {
  let component: ApprovequestionitemComponent;
  let fixture: ComponentFixture<ApprovequestionitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovequestionitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovequestionitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
