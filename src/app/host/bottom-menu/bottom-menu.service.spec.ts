import { TestBed, inject } from '@angular/core/testing';

import { BottomMenuService } from './bottom-menu.service';

describe('BottomMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BottomMenuService]
    });
  });

  it('should be created', inject([BottomMenuService], (service: BottomMenuService) => {
    expect(service).toBeTruthy();
  }));
});
