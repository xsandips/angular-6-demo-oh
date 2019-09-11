import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPrestartComponent } from './job-prestart.component';

describe('JobPrestartComponent', () => {
  let component: JobPrestartComponent;
  let fixture: ComponentFixture<JobPrestartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPrestartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPrestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
