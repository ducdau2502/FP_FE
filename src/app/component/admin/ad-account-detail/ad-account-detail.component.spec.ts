import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAccountDetailComponent } from './ad-account-detail.component';

describe('AdAccountDetailComponent', () => {
  let component: AdAccountDetailComponent;
  let fixture: ComponentFixture<AdAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdAccountDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
