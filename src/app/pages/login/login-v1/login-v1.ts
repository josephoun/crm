import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import pageSettings from '../../../config/page-settings';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'login-v1',
  templateUrl: './login-v1.html'
})
export class LoginV1Page implements OnDestroy, OnInit {
  pageSettings = pageSettings;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.pageSettings.pageEmpty = true;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Easy access to form controls
   */
  get f() { return this.loginForm.controls; }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  // old usage for ngForms
  // formSubmit(f: NgForm) {
  //   this.router.navigate(['dashboard/v3']);
  // }
}
