import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role, getRolesArray } from 'src/app/constants/enums';
import { login } from 'src/app/interfaces/navigation';
import { IRegistrationModel } from 'src/app/interfaces/user.model';
import { NavService } from 'src/app/services/nav.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  roles: any[] = [];
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private navService: NavService, private serverService: ServerService, private snackbarService: MatSnackBar) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      cellPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      dateOfBirth: new FormControl(new Date(), [
        Validators.required,
        Validators.minLength(3),
      ]),
      role: new FormControl(Role.NEW_USER, [Validators.required]),
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  ngOnInit(): void {
    this.roles = getRolesArray();
  }

  onSubmit(formData: IRegistrationModel) {
    console.log(formData);
    this.serverService.registerUser(formData).subscribe(x => {
      this.snackbarService.open("Registration was successful. Please login.", "close", { duration: 3000});
      this.navService.navTo(login);
    });
  }

  goToLogin() {
    this.navService.navTo({ ...login });
  }
}
