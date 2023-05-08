import { Injectable } from '@angular/core';
import { ICourseModel } from '../interfaces/course.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  private coursesSubject: BehaviorSubject<ICourseModel[]>;
  public coursesSubject$: Observable<ICourseModel[]>;
  private selectedCourseSubject: BehaviorSubject<ICourseModel | null>;
  public selectedCourseSubject$: Observable<ICourseModel | null>;
  
  constructor() { 
    this.coursesSubject = new BehaviorSubject<ICourseModel[]>([]);
    this.coursesSubject$ = this.coursesSubject.asObservable();

    this.selectedCourseSubject = new BehaviorSubject<ICourseModel | null>(null);
    this.selectedCourseSubject$ = this.selectedCourseSubject.asObservable();
  }
  setCourses(courses: ICourseModel[]) {
    this.coursesSubject.next(courses);
  }
  setSelectedCourse(course: ICourseModel) {
    this.selectedCourseSubject.next(course);
  }
}
