import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccueilBlogComponent } from './page-accueil-blog.component';

describe('PageAccueilBlogComponent', () => {
  let component: PageAccueilBlogComponent;
  let fixture: ComponentFixture<PageAccueilBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAccueilBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAccueilBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
