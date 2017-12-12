import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFilesListPageComponent } from './my-files-list-page.component';

describe('MyFilesListPageComponent', () => {
  let component: MyFilesListPageComponent;
  let fixture: ComponentFixture<MyFilesListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFilesListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFilesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
