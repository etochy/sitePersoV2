import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderConstructComponent } from './under-construct.component';

describe('UnderConstructComponent', () => {
  let component: UnderConstructComponent;
  let fixture: ComponentFixture<UnderConstructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderConstructComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderConstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
