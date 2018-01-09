import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosebuttonComponent } from './closebutton.component';

describe('ClosebuttonComponent', () => {
  let component: ClosebuttonComponent;
  let fixture: ComponentFixture<ClosebuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosebuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
