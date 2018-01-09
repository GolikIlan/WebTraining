import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndoflinebuttonComponent } from './endoflinebutton.component';

describe('EndoflinebuttonComponent', () => {
  let component: EndoflinebuttonComponent;
  let fixture: ComponentFixture<EndoflinebuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndoflinebuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndoflinebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
