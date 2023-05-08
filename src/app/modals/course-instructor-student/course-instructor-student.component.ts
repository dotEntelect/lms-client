import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/constants/enums';
import { ICourseModel } from 'src/app/interfaces/course.model';
import { IUserModel } from 'src/app/interfaces/user.model';
import { ServerService } from 'src/app/services/server.service';
import { UsersService } from 'src/app/services/users.service';

interface ICourseLink {
  user: IUserModel;
  isLinked: boolean;
}

@Component({
  selector: 'app-course-instructor-student',
  templateUrl: './course-instructor-student.component.html',
  styleUrls: ['./course-instructor-student.component.scss'],
})
export class CourseInstructorStudentComponent implements OnInit {
  userList: IUserModel[] = [];
  dataSource: MatTableDataSource<ICourseLink> =
    new MatTableDataSource<ICourseLink>([]);
  displayedColumns: string[] = [
    'position',
    'fullname',
    'emailAddress',
    'cell',
    'functions',
  ];

  activeRole: 'INSTRUCTOR' | 'STUDENT' = 'INSTRUCTOR';

  constructor(
    public dialogRef: MatDialogRef<CourseInstructorStudentComponent>,
    private serverService: ServerService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ICourseModel,
    private _snackBar: MatSnackBar,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.serverService.getUsers().subscribe();
    this.userService.usersSubject$.subscribe((x) => {
      this.userList = x;
      this.updateDatasources();
    });
  }
  tabChanged({ index }: any) {
    console.log(index);
    this.activeRole = index === 0 ? 'INSTRUCTOR' : 'STUDENT';
    this.updateDatasources();
  }
  updateDatasources() {
    const data: ICourseLink[] = [];
    console.log(this.activeRole.toString());
    const filterUsers = this.userList.filter(
      (x) => x.role.toString() == this.activeRole
    );
    filterUsers.forEach((user: IUserModel) => {
      this.data.instructors = this.data.instructors || [];
      this.data.students = this.data.students || [];
      if (this.activeRole === 'INSTRUCTOR') {
        const isLinked = !!this.data.instructors.find(
          (x) => x.id === user.id && x.role === user.role
        );
        data.push({
          isLinked,
          user,
        });
      } else if (this.activeRole === 'STUDENT') {
        const isLinked = !!this.data.students.find(
          (x) => x.id === user.id && x.role === user.role
        );
        data.push({
          isLinked,
          user,
        });
      }
    });
    this.dataSource.data = data;
  }
  toggleLink(courseLink: ICourseLink) {
    if (this.activeRole === 'INSTRUCTOR') {
      this.serverService
        .toggleCourseInstrunctorLink({
          courseId: this.data.id,
          studentId: 0,
          instructorId: courseLink.user.id,
          linked: !courseLink.isLinked,
        })
        .subscribe((c: any) => {
          if (c) {
            this.data.instructors = [...c.instructors];
            this.updateDatasources();
          }
        });
    } else if (this.activeRole === 'STUDENT') {
      this.serverService
        .toggleCourseStudentLink({
          courseId: this.data.id,
          instructorId: 0,
          studentId: courseLink.user.id,
          linked: !courseLink.isLinked,
        })
        .subscribe((c: any) => {
          if (c) {
            this.data.students = [...c.students];
            this.updateDatasources();
          }
        });
    }
    console.log(courseLink);
  }
}
