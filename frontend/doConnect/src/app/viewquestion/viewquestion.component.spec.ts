import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewquestionComponent } from './viewquestion.component';

describe('ViewquestionComponent', () => {
  let component: ViewquestionComponent;
  let fixture: ComponentFixture<ViewquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewquestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
