import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreByWeekComponent } from './load-more-by-week.component';

describe('LoadMoreByWeekComponent', () => {
  let component: LoadMoreByWeekComponent;
  let fixture: ComponentFixture<LoadMoreByWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadMoreByWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreByWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
