import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { IToken } from '../../../core/interfaces/i-token';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit{
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['nuelsr07', [Validators.required]],
      password: ['nuelsr10', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      // Prevent access when logged in.
      this.router.navigate(['admin']);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.authenticationService
        .signIn(this.form.value)
        .pipe(catchError(this.authenticationService.baseHttp.handleError))
        .subscribe((resp: IToken) => {
          this.authenticationService.sessionStart();
          this.authenticationService.token = resp.access;
          this.router.navigate(['admin']);
        });
    }
  }
}
