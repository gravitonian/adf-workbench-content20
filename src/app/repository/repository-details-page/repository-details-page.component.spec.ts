import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryDetailsPageComponent } from './repository-details-page.component';

describe('RepositoryDetailsPageComponent', () => {
  let component: RepositoryDetailsPageComponent;
  let fixture: ComponentFixture<RepositoryDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
