import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAccountListComponent } from './ad-account-list.component';

describe('AdAccountListComponent', () => {
  let component: AdAccountListComponent;
  let fixture: ComponentFixture<AdAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
