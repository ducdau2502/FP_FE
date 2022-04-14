import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SProductListComponent } from './s-product-list.component';

describe('SProductListComponent', () => {
  let component: SProductListComponent;
  let fixture: ComponentFixture<SProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
