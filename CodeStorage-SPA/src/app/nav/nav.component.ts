import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { DocumentService } from '../_services/document.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user = new User();

  constructor(public authService: AuthService, private alertify: AlertifyService,
              private route: Router, private documentService: DocumentService) { }

  ngOnInit() {
  }

  login()
  {
    this.authService.login(this.user).subscribe(() =>
      {
        this.alertify.success('Login successfully');
      }, error =>
      {
        this.alertify.error(error);
      });
  }

  loggedIn()
  {
    return this.authService.loggedIn();
  }

  logout()
  {
    this.alertify.confirm('Are you sure you want to log out?', () =>
    {
      localStorage.removeItem('token');
      this.alertify.message('Logged out');
      this.route.navigate(['']);
    });
  }

  newDocument()
  {
    this.documentService.newDocument().subscribe(newDocument =>
      {
        this.route.navigate(['documents/' + newDocument.id]);
      }, error =>
      {
        this.alertify.error('Failed to create new document');
        this.route.navigate(['documents']);
      });
  }
}
