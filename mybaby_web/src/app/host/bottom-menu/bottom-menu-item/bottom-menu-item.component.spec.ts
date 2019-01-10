import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BottomMenuItemComponent} from './bottom-menu-item.component';

describe('BottomMenuItemComponent', () => {
  let component: BottomMenuItemComponent;
  let fixture: ComponentFixture<BottomMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BottomMenuItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
