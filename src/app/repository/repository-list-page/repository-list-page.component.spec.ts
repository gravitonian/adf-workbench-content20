import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryListPageComponent } from './repository-list-page.component';

describe('RepositoryListPageComponent', () => {
  let component: RepositoryListPageComponent;
  let fixture: ComponentFixture<RepositoryListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
