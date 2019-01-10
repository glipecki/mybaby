import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NutritionDashboardWidgetComponent} from './nutrition-dashboard-widget.component';

describe('SleepDashboardWidgetComponent', () => {
  let component: NutritionDashboardWidgetComponent;
  let fixture: ComponentFixture<NutritionDashboardWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionDashboardWidgetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionDashboardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
