import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICourseModel } from 'src/app/interfaces/course.model';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss'],
})
export class AddEditCourseComponent {
  courseForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEditCourseComponent>,
    private serverService: ServerService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ICourseModel,
    private _snackBar: MatSnackBar
  ) {
    this.courseForm = fb.group({
      id: new FormControl(0),
      code: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    if (data) {
      this.courseForm.patchValue({
        code: data.code,
        title: data.title,
        description: data.description,
      });
    }
  }
  saveCourse(formData: ICourseModel) {
    const addNew = this.data ? false : true;
    if (!addNew) {
      this.data.code = formData.code;
      this.data.title = formData.title;
      this.data.description = formData.description;
      this.serverService.updateCourses(this.data).subscribe((x: any) => {
        this.alertAndExit(x);
      });
    } else {
      this.data = formData;
      this.serverService.addCourses(this.data).subscribe((x: any) => {
        this.alertAndExit(x);
      });
    }
  }
  alertAndExit(data: ICourseModel) {
    this._snackBar.open('Courses added successfully', 'close', {
      duration: 3000,
    });
    this.dialogRef.close(data);
  }
}
