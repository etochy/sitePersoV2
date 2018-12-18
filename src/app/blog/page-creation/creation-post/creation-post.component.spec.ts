import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPostComponent } from './creation-post.component';

describe('CreationPostComponent', () => {
  let component: CreationPostComponent;
  let fixture: ComponentFixture<CreationPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
