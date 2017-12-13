import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesListPageComponent } from './sites-list-page.component';

describe('SitesListPageComponent', () => {
  let component: SitesListPageComponent;
  let fixture: ComponentFixture<SitesListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
