import { Component, OnInit, Input } from '@angular/core';
import { CodingDocument } from 'src/app/classes/codingDocument';
import { DocumentService } from 'src/app/_services/document.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-document-individual',
  templateUrl: './document-individual.component.html',
  styleUrls: ['./document-individual.component.css']
})
export class DocumentIndividualComponent implements OnInit {
  @Input() document: CodingDocument;
  constructor() { }

  ngOnInit() {
  }
}
