import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { register } from 'src/app/interfaces/navigation';
import { lLoginModel } from 'src/app/interfaces/user.model';
import { FacadeService } from 'src/app/services/facade.service';
import { NavService } from 'src/app/services/nav.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private navService: NavService,
    private serverService: ServerService,
    private facadeService: FacadeService,
    private snackbarService: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  ngOnInit(): void {
    this.facadeService.userLoggedOut();
  }
  onSubmit(formData: lLoginModel) {
    console.log(formData);
    this.serverService.login(formData).subscribe(
      (res) => {},
      (err) =>
        this.snackbarService.open(
          'Login Failed. Please Check Your Credentials.',
          'close',
          { duration: 3000 }
        )
    );
  }

  goToRegister() {
    this.navService.navTo(register);
  }
}
