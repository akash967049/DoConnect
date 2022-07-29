import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveansweritemComponent } from './approveansweritem.component';

describe('ApproveansweritemComponent', () => {
  let component: ApproveansweritemComponent;
  let fixture: ComponentFixture<ApproveansweritemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveansweritemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveansweritemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
