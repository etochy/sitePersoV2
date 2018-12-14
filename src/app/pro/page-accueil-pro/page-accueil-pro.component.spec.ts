import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccueilProComponent } from './page-accueil-pro.component';

describe('PageAccueilProComponent', () => {
  let component: PageAccueilProComponent;
  let fixture: ComponentFixture<PageAccueilProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAccueilProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAccueilProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
