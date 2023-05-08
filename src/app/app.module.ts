import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterceptorService } from './helpers/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { CourseAdminComponent } from './components/admin/course-admin/course-admin.component';
import { NavComponent } from './nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CoursesComponent } from './components/courses/courses.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { AddEditCourseComponent } from './modals/add-edit-course/add-edit-course.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseStudentsComponent } from './modals/course-students/course-students.component';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { AddEditChapterComponent } from './modals/add-edit-chapter/add-edit-chapter.component';
import {MatMenuModule} from '@angular/material/menu';
import { CourseInstructorStudentComponent } from './modals/course-instructor-student/course-instructor-student.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    UserAdminComponent,
    CourseAdminComponent,
    NavComponent,
    CoursesComponent,
    LoaderComponent,
    AddEditCourseComponent,
    CourseDetailsComponent,
    CourseStudentsComponent,
    AddEditChapterComponent,
    CourseInstructorStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
