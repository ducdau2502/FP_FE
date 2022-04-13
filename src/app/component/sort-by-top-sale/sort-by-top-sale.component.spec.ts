import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByTopSaleComponent } from './sort-by-top-sale.component';

describe('SortByTopSaleComponent', () => {
  let component: SortByTopSaleComponent;
  let fixture: ComponentFixture<SortByTopSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortByTopSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByTopSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
