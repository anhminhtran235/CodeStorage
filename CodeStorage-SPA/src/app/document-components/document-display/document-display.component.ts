import { Component, OnInit, HostListener } from '@angular/core';
import { DocumentService } from 'src/app/_services/document.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CodingDocument } from 'src/app/classes/codingDocument';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-document-display',
  templateUrl: './document-display.component.html',
  styleUrls: ['./document-display.component.css']
})
export class DocumentDisplayComponent implements OnInit {
  lastSaved = new CodingDocument();
  document: CodingDocument;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any)
  {
    if(this.dataHasChanged())
    {
      $event.returnValue = true;
    }
  }

  constructor(private documentService: DocumentService, private activatedRoute: ActivatedRoute,
              private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data =>
    {
      this.document = data.document;
    });

    this.activatedRoute.paramMap.subscribe((params: ParamMap) =>
    {
      // tslint:disable-next-line: radix
      const id = parseInt(params.get('documentId'));
      this.loadDocument(id);
    });
  }

  loadDocument(documentId: number)
  {
    this.documentService.getDocument(documentId).subscribe(response =>
      {
        this.document = response;
        this.lastSaved.content = this.document.content;
        this.lastSaved.title = this.document.title;
      }, error =>
      {
        this.alertify.error('Failed to load document');
        this.router.navigate(['documents']);
      });
  }

  saveChanges()
  {
    if (this.document.title === '' && this.document.content !== '')
    {
      this.document.title = 'Untitled';
    }
    this.documentService.updateDocument(this.document).subscribe(() =>
    {
      this.lastSaved.content = this.document.content;
      this.lastSaved.title = this.document.title;
      this.alertify.success('Saved successfully');
    }, error =>
    {
      this.alertify.error('Failed to save');
    });
  }

  dataHasChanged()
  {
    return this.lastSaved.content !== this.document.content ||
           this.lastSaved.title !== this.document.title;
  }

  deleteDocument()
  {
    this.alertify.confirm('Are you sure you want to delete this document?', () =>
    {
      this.lastSaved = this.document;
      this.document.content = '';
      this.document.title = '';
      this.documentService.updateDocument(this.document).subscribe(() =>
      {
        this.alertify.error('Document deleted');
        this.router.navigate(['/documents']);
      });
    });
  }
}
