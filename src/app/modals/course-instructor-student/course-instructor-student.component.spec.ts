import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInstructorStudentComponent } from './course-instructor-student.component';

describe('CourseInstructorStudentComponent', () => {
  let component: CourseInstructorStudentComponent;
  let fixture: ComponentFixture<CourseInstructorStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseInstructorStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseInstructorStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
