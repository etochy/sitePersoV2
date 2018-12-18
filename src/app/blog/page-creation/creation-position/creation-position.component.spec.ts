import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPositionComponent } from './creation-position.component';

describe('CreationPositionComponent', () => {
  let component: CreationPositionComponent;
  let fixture: ComponentFixture<CreationPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
