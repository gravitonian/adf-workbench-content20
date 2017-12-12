import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFilesPageComponent } from './my-files-page.component';

describe('MyFilesPageComponent', () => {
  let component: MyFilesPageComponent;
  let fixture: ComponentFixture<MyFilesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFilesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
