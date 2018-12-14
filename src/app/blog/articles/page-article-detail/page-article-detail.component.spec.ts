import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageArticleDetailComponent } from './page-article-detail.component';

describe('PageArticleDetailComponent', () => {
  let component: PageArticleDetailComponent;
  let fixture: ComponentFixture<PageArticleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageArticleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
