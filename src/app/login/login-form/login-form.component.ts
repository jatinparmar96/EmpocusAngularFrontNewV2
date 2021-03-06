import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  user: FormGroup;
  errors: any;
  isProcessing = false;
  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.user = fb.group({
      email: ['jatinparmar96@gmail.com', Validators.required],
      password: ['123', Validators.required]
    });
  }

  ngOnInit() {}
  onSubmit(user1) {
    this.isProcessing = true;
    this.authService
      .signinUser(user1.value)
      .then(data => {
        const user: any = data;
        if (user.status) {
          console.log(user);
          this.isProcessing = false;
          this.router.navigateByUrl('/');
        } else {
          this.isProcessing = false;
          this.errors = user.message;
          console.log(this.errors);
        }
      })
      .catch(error => {
        this.isProcessing = false;
        console.log(this.errors);
        this.errors = error.statusText;
      });
  }

  onForgotPassword() {
    alert('You forgot Password');
  }
}
