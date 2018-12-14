import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAddFormComponent } from './log-add-form.component';

describe('LogAddFormComponent', () => {
  let component: LogAddFormComponent;
  let fixture: ComponentFixture<LogAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
