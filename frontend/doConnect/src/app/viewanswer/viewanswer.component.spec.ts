import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewanswerComponent } from './viewanswer.component';

describe('ViewanswerComponent', () => {
  let component: ViewanswerComponent;
  let fixture: ComponentFixture<ViewanswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewanswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewanswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
