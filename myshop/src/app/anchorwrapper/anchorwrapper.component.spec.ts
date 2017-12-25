import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorwrapperComponent } from './anchorwrapper.component';

describe('AnchorwrapperComponent', () => {
  let component: AnchorwrapperComponent;
  let fixture: ComponentFixture<AnchorwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
