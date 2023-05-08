import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditChapterComponent } from 'src/app/modals/add-edit-chapter/add-edit-chapter.component';
import { IChapterModel } from 'src/app/interfaces/chapter.model';
import { ICourseModel } from 'src/app/interfaces/course.model';
import { courses } from 'src/app/interfaces/navigation';
import { AddEditCourseComponent } from 'src/app/modals/add-edit-course/add-edit-course.component';
import { CoursesService } from 'src/app/services/courses.service';
import { NavService } from 'src/app/services/nav.service';
import { ServerService } from 'src/app/services/server.service';
import { CourseInstructorStudentComponent } from 'src/app/modals/course-instructor-student/course-instructor-student.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit, AfterViewInit {
  course: ICourseModel | null = null;
  chapterDataSource: MatTableDataSource<IChapterModel> =
    new MatTableDataSource<IChapterModel>([]);
  displayedChapterColumns: string[] = [
    'position',
    'title',
    'addedBy',
    'lessonCount',
    'functions'
  ];

  constructor(
    private courseService: CoursesService,
    private navService: NavService,
    private dialogService: MatDialog,
    private serverService: ServerService
  ) {}
  ngOnInit(): void {
    this.courseService.selectedCourseSubject$.subscribe((x) => {
      if (x) {
        this.serverService.getChaptersByCourseId(x.id).subscribe((xc: any) => {
          x.chapters = xc;
          this.course = x;
          this.updateDataSource(xc);
        });
      } else {
        this.navService.navTo(courses);
      }
    });
  }
  ngAfterViewInit(): void {}

  addEditChapter(chapter: IChapterModel | null) {
    this.dialogService
      .open(AddEditChapterComponent, {
        data: { course: this.course, chapter },
        width: '400px',
      })
      .afterClosed()
      .subscribe((x: IChapterModel) => {
        if (x && this.course) {
          this.courseService.setSelectedCourse(this.course);
        }
      });
  }

  editCourse() {
    const dialog = this.dialogService.open(AddEditCourseComponent, {
      data: this.course,
      width: `350px`,
    });
    dialog.afterClosed().subscribe((d) => {
      if (d && this.course) {
        this.course.code = d.code;
        this.course.description = d.description;
        this.course.title = d.title;
      }
    });
  }

  linkInstructorsStudents() {
    this.dialogService
    .open(CourseInstructorStudentComponent, {
      data: this.course,
      // width: '600px',
      // height: '400px'
    })
    .afterClosed()
    .subscribe((x: any) => {
      if (x && this.course) {
        // this.courseService.setSelectedCourse(this.course);
      }
    });
  }

  navTo(to: string) {
    if(to === "lessons") {
      
    }
  }
  updateDataSource(data: IChapterModel[]) {
    this.chapterDataSource.data = data;
  }
}
