import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoursesComponent } from './components/courses/courses.component';
import { RegisterComponent } from './auth/register/register.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: "courses",
      component: CoursesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "course-details",
      component: CourseDetailsComponent,
      canActivate: [AuthGuard]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
