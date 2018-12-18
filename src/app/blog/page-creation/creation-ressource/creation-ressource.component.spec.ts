import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationRessourceComponent } from './creation-ressource.component';

describe('CreationRessourceComponent', () => {
  let component: CreationRessourceComponent;
  let fixture: ComponentFixture<CreationRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
