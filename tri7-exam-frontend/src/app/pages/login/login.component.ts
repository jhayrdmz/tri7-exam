import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formError = null;
  loading = false;
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('manager@example.com', [Validators.required]),
      password: new FormControl('password', [Validators.required]),
    });
  }

  login(form: FormGroup) {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.auth
      .login(form.value.username, form.value.password)
      .then(() => this.router.navigate(['/']))
      .catch((res: any) => {
        this.formError = res.error.message;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  ngOnInit() {}
}
