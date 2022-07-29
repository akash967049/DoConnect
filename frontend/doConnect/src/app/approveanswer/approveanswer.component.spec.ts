import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveanswerComponent } from './approveanswer.component';

describe('ApproveanswerComponent', () => {
  let component: ApproveanswerComponent;
  let fixture: ComponentFixture<ApproveanswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveanswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveanswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
