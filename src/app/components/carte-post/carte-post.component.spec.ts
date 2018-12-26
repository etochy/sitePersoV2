import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartePostComponent } from './carte-post.component';

describe('CartePostComponent', () => {
  let component: CartePostComponent;
  let fixture: ComponentFixture<CartePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
