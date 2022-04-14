import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdStoreListComponent } from './ad-store-list.component';

describe('AdStoreListComponent', () => {
  let component: AdStoreListComponent;
  let fixture: ComponentFixture<AdStoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdStoreListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdStoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
