import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryDetailsFormPageComponent } from './repository-details-form-page.component';

describe('RepositoryDetailsFormPageComponent', () => {
  let component: RepositoryDetailsFormPageComponent;
  let fixture: ComponentFixture<RepositoryDetailsFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryDetailsFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryDetailsFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
