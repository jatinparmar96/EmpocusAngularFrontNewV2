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
  isProcessing: boolean = false;
  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = fb.group({
      "name": ["", Validators.required],
      "display_name": ["", Validators.required],
      "email": ["", Validators.required],
      "mobile": ["", Validators.required],
      "password": ["", Validators.required],
    });
  }

  ngOnInit() {
  }
  register(user) {
    this.isProcessing = true;
    this.authService.signupUser(user.value).then((data) => {
      let user: any = data;
      console.log(user);
      if (user.status === 'ok') {
        this.router.navigateByUrl('/setupCompany');
      }
    })
      .catch((error) => {
        this.isProcessing = false;

        this.errors = Object.keys(error).map(i => error[i])
      })
  }

}
