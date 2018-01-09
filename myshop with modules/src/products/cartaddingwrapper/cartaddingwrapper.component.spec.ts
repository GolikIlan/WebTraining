import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaddingwrapperComponent } from './cartaddingwrapper.component';

describe('CartaddingwrapperComponent', () => {
  let component: CartaddingwrapperComponent;
  let fixture: ComponentFixture<CartaddingwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaddingwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaddingwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
