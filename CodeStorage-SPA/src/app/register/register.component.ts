import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/user';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User();
  @Output() cancelRegistration = new EventEmitter();
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  cancel()
  {
    this.cancelRegistration.emit(false);
  }

  register()
  {
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
