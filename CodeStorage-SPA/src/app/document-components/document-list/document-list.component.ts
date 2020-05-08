import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/_services/document.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CodingDocument } from 'src/app/classes/codingDocument';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: CodingDocument[] = [];
  constructor(private documentService: DocumentService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>
      {
        const docFromServer = data.documents;
        this.documents = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < docFromServer.length; i++)
        {
          if (docFromServer[i].title !== '' || docFromServer[i].content !== '')
          {
            this.documents.push(docFromServer[i]);
          }
        }
      });
  }

  loadDocuments()
  {
    this.documentService.getDocuments().subscribe(response =>
      {
        this.documents = response;
      }, error =>
      {
        this.alertify.error(error);
      });
  }
}
