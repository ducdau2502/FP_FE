import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLikeComponent } from './store-like.component';

describe('StoreLikeComponent', () => {
  let component: StoreLikeComponent;
  let fixture: ComponentFixture<StoreLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
