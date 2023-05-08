import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ILoggedInUserState,
  IUserModel,
  lLoginModel,
} from '../interfaces/user.model';
import { environment } from '../environment';
import { FacadeService } from './facade.service';
import { map } from 'rxjs/operators';
import { ICourseModel } from '../interfaces/course.model';
import { UsersService } from './users.service';
import { IChapterModel } from '../interfaces/chapter.model';
import { NavService } from './nav.service';
import { dashboard } from '../interfaces/navigation';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
 
  baseUrl!: string;
  constructor(private http: HttpClient, private facadeService: FacadeService, private userService: UsersService, private navService: NavService) {
    this.baseUrl = `${environment.baseUrl}${environment.apiVersion}`;
  }

  registerUser(user: IUserModel) {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }
  login(user: lLoginModel) {
    return this.http
      .post(`${this.baseUrl}/auth/login`, user)
      .pipe(map((res: any) => {
        this.facadeService.setLoggedInUser(res);
        this.navService.navTo(dashboard);
      }));
  }

  updateUser(user: IUserModel) {
    return this.http.put(`${this.baseUrl}/auth/register/` + user.id, user);
  }
  
  getUsers() {
    return this.http.get(`${this.baseUrl}/manage-users`).pipe(
      map((users: any) => this.userService.setUsers(users))
    );
  }



  getCourses() {
    return this.http.get(`${this.baseUrl}/courses`);
  }

  getCourseById(id: number) {
    return this.http.get(`${this.baseUrl}/courses/` + id);
  }

  addCourses(course: ICourseModel) {
    return this.http.post(`${this.baseUrl}/courses`, course);
  }

  updateCourses(course: ICourseModel) {
    return this.http.put(`${this.baseUrl}/courses/` + course.id, course);
  }

  toggleCourseInstrunctorLink(link: { courseId: number; instructorId: number; studentId: number; linked: boolean; }) {
    return this.http.post(`${this.baseUrl}/courses/toggleInstructorLink` , link);
  }

  toggleCourseStudentLink(link: { courseId: number; studentId: number; instructorId: number; linked: boolean; }) {
    return this.http.post(`${this.baseUrl}/courses/toggleStudentLink` , link);
  }


  getChaptersByCourseId(id: number) {
    return this.http.get(`${this.baseUrl}/chapters/chaptersByCourse/` + id);
  }

  getChapterById(id: number) {
    return this.http.get(`${this.baseUrl}/chapters/` + id);
  }

  addChapters(chapter: IChapterModel) {
    return this.http.post(`${this.baseUrl}/chapters`, chapter);
  }

  updateChapters(chapter: IChapterModel) {
    return this.http.put(`${this.baseUrl}/chapters/` + chapter.id, chapter);
  }

  

}
