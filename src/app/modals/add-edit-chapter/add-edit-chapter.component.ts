import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IChapterModel } from 'src/app/interfaces/chapter.model';
import { ICourseModel } from 'src/app/interfaces/course.model';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-add-edit-chapter',
  templateUrl: './add-edit-chapter.component.html',
  styleUrls: ['./add-edit-chapter.component.scss'],
})
export class AddEditChapterComponent {
  chapterForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEditChapterComponent>,
    private serverService: ServerService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { course: ICourseModel; chapter: IChapterModel },
    private _snackBar: MatSnackBar
  ) {
    this.chapterForm = fb.group({
      id: new FormControl(0),
      courseId: new FormControl(data.course.id, Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    if (data?.chapter) {
      this.chapterForm.patchValue({
        id: data.chapter.id,
        title: data.chapter.title,
        description: data.chapter.description,
      });
    }
  }

  saveChapter(formData: IChapterModel) {
    const addNew = this.data.chapter ? false : true;
    if (!addNew) {
      this.data.chapter.title = formData.title;
      this.data.chapter.description = formData.description;
      this.serverService
        .updateChapters(this.data.chapter)
        .subscribe((x: any) => {
          this.alertAndExit(x);
        });
    } else {
      this.data.chapter = formData;
      this.serverService.addChapters(this.data.chapter).subscribe((x: any) => {
        this.alertAndExit(x);
      });
    }
  }
  alertAndExit(data: IChapterModel) {
    this._snackBar.open('Chapter added successfully', 'close', {
      duration: 3000,
    });
    this.dialogRef.close(data);
  }
}
