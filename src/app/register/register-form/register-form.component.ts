import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  user: FormGroup;
  errors: any;
  isProcessing = false;
  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = fb.group({
      name: ['', Validators.required],
      display_name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}
  register(user1) {
    this.isProcessing = true;
    this.authService
      .signupUser(user1.value)
      .then(data => {
        const user: any = data;
        if (user.status === 'ok') {
          this.authService.updateToken(user.token);
          this.router.navigateByUrl('/register/create');
        }
      })
      .catch(error => {
        this.isProcessing = false;

        this.errors = Object.keys(error).map(i => error[i]);
      });
  }
}
