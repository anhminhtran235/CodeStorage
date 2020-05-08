import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/user';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentService } from '../_services/document.service';
import { CodingDocument } from '../classes/codingDocument';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User();
  @Output() cancelRegistration = new EventEmitter();
  registerForm: FormGroup;
  constructor(private authService: AuthService, private alertify: AlertifyService,
              private documentService: DocumentService) { }

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
      }, this.passwordMatchValidator);
  }

  passwordMatchValidator(f: FormControl)
  {
    return f.get('password').value === f.get('confirmPassword').value ? null : {mismatch: true};
  }

  cancel()
  {
    this.cancelRegistration.emit(false);
  }

  register()
  {
    this.user.name = this.registerForm.get('username').value;
    this.user.password = this.registerForm.get('password').value;
    this.authService.register(this.user).subscribe(() =>
      {
        this.alertify.success('Register successfully');
        this.authService.login(this.user).subscribe();
      }, error =>
      {
        this.alertify.error(error);
      });
  }

}
