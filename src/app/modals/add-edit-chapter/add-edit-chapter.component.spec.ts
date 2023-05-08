import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditChapterComponent } from './add-edit-chapter.component';

describe('AddEditChapterComponent', () => {
  let component: AddEditChapterComponent;
  let fixture: ComponentFixture<AddEditChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditChapterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
