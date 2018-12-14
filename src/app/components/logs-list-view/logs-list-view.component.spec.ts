import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsListViewComponent } from './logs-list-view.component';

describe('LogsListViewComponent', () => {
  let component: LogsListViewComponent;
  let fixture: ComponentFixture<LogsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
