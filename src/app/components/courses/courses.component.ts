import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICourseModel } from 'src/app/interfaces/course.model';
import { INavItem } from 'src/app/interfaces/navigation';
import { AddEditCourseComponent } from 'src/app/modals/add-edit-course/add-edit-course.component';
import { CoursesService } from 'src/app/services/courses.service';
import { NavService } from 'src/app/services/nav.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: ICourseModel[] = [];
  addEditModalwidth = '350px';
  constructor(
    private serverService: ServerService,
    private dialogService: MatDialog,
    private navService: NavService,
    private courseService: CoursesService
  ) {}
  ngOnInit(): void {
    this.serverService.getCourses().subscribe((x: any) => (this.courses = x));
  }
  addCourse() {
    const dialog = this.dialogService.open(AddEditCourseComponent, {
      width: `${this.addEditModalwidth}`,
    });
    dialog.afterClosed().subscribe((d) => {
      if (d) {
        this.courses.push(d);
      }
    });
  }
  editCourse(course: ICourseModel) {
    const dialog = this.dialogService.open(AddEditCourseComponent, {
      data: course,
      width: `${this.addEditModalwidth}`,
    });
    dialog.afterClosed().subscribe((d) => {
      if (d) {
        this.courses.push(d);
      }
    });
  }
  goToDetails (course: ICourseModel) {
    this.courseService.setSelectedCourse(course);
    const navItem: INavItem = {
      icon: '',
      link: 'course-details',
      txt: 'Course-Details'
    }
    this.navService.navTo(navItem)
  }
}
