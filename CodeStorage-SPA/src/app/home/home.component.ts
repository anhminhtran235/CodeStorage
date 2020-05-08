import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { DocumentService } from '../_services/document.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor(private authService: AuthService, private documentService: DocumentService,
              private route: Router, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  registerToggle()
  {
    this.registerMode = true;
  }

  cancelRegisterMode(b: boolean)
  {
    this.registerMode = b;
  }

  loggedIn()
  {
    return this.authService.loggedIn();
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

  goToLink(url: string)
  {
    window.open(url, '_blank');
  }
}
