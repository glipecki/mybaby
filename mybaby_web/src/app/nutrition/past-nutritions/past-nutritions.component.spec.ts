import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PastNutritionsComponent} from './past-nutritions.component';

describe('PastSleepsComponent', () => {
  let component: PastNutritionsComponent;
  let fixture: ComponentFixture<PastNutritionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PastNutritionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastNutritionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
